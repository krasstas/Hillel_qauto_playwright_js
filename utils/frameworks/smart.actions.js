import { expect } from '@playwright/test';
import { cleanString, escapeRegExp } from '../helpers/helpers.js';

export class SmartActions {
  constructor(page) {
    this.page = page;
  }

  async click(locator, { force = false, option } = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();

    if (option) {
      await locator.click(option);
    } else {
      await locator.click({ force });
    }
  }

  async clear(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.clear();
  }

  async clickWithMovePosition(locator, { option } = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.click(option);
  }

  async hover(locator, { timeout = 10000, force = true } = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();

    await this.#retry(async () => {
      await locator.hover({ force });
    });
  }

  async fill(locator, value, { force = false } = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.click({ force });
    await locator.fill('', { force });
    await locator.fill(value, { force });
  }

  async type(locator, value, { delay = 50 } = {}) {
    await locator.waitFor({ state: 'visible' });
    await locator.pressSequentially(String(value), { delay });
    return this;
  }

  async pressSequentially(locator, value) {
    await locator.pressSequentially(String(value));
  }

  async text(locator) {
    await locator.waitFor();
    return (await locator.textContent())?.trim();
  }

  async html(locator) {
    const html = await locator.evaluate((el) => el.outerHTML);
    console.log({ html });
  }

  async count(locator) {
    return await locator.count();
  }

  openInNewTab = async (locator, { auth = false } = {}) => {
    await locator.waitFor();
    const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), locator.click()]);

    if (auth) {
      const profileKey = process.env.PROFILE_KEY || 'default';
      const authBundleJson = this.resolveAuthBundleJson();
      const authBundle = JSON.parse(authBundleJson);
      const token = authBundle[profileKey] || authBundle.default;

      if (token) {
        await newPage.addInitScript((t) => {
          window.localStorage.setItem('token', t);
          window.localStorage.setItem('locale', 'ru');
        }, token);
        await newPage.reload();
      }
    }

    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  };

  resolveAuthBundleJson() {
    const inlineJson = (process.env.AUTH_BUNDLE_JSON || '').trim();
    if (inlineJson) {
      return inlineJson;
    }

    const bundleBase64 = (process.env.AUTH_BUNDLE_JSON_B64 || '').trim();
    if (bundleBase64) {
      return Buffer.from(bundleBase64, 'base64').toString('utf-8');
    }

    throw new Error('AUTH_BUNDLE_JSON or AUTH_BUNDLE_JSON_B64 must be provided');
  }

  async expectVisible(locator, { timeout = 10000 } = {}) {
    await expect(locator).toBeVisible({ timeout });
  }

  async hasNoChildWithClass(locator, { className } = {}) {
    await expect(locator.locator(`.${className}`)).not.toBeVisible();
  }

  async hasChildWithClass(locator, { className } = {}) {
    await expect(locator.locator(`.${className}`)).toBeVisible();
  }

  async hasInputValue(locator, { value, exact = true } = {}) {
    if (exact) {
      await expect(locator).toHaveValue(value);
    } else {
      await expect(locator).toHaveValue(new RegExp(value));
    }
  }

  async isVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async isHidden(locator, { timeout } = {}) {
    await expect(locator).toBeHidden({ timeout });
  }

  async expectChecked(locator) {
    await expect(locator).toBeChecked();
  }

  async expectNotChecked(locator) {
    await expect(locator).not.toBeChecked();
  }

  async expectText(locator, { text, ignoreRegister = false, fullExact = false } = {}) {
    if (text instanceof RegExp) {
      await expect(locator).toHaveText(text);
      return;
    }

    if (fullExact) {
      await expect(locator).toContainText(new RegExp(`^${text.toString()}$`, 'i'));
      return;
    }

    if (ignoreRegister) {
      await expect(locator).toContainText(new RegExp(text.toString() + '?', 'i'));
      return;
    }

    await expect(locator).toContainText(text.toString());
  }

  async expectOneOfTexts(locator, { texts } = {}) {
    let pattern;

    if (texts instanceof RegExp) {
      pattern = texts;
    } else if (Array.isArray(texts)) {
      pattern = new RegExp(`(${texts.join('|')})`, 'i');
    } else {
      pattern = new RegExp(texts, 'i');
    }

    await expect(locator).toContainText(pattern);
  }

  async expectClass(locator, { className } = {}) {
    await expect(locator).toHaveClass(new RegExp(className));
  }

  async expectNoClass(locator, { className } = {}) {
    await expect(locator).not.toHaveClass(new RegExp(className));
  }

  async expectNotContainText(locator, { text } = {}) {
    await expect(locator).not.toContainText(text.toString());
  }

  async expectCount(locator, { count } = {}) {
    const expectedCount = typeof count === 'string' ? parseInt(count, 10) : count;
    await expect(locator).toHaveCount(expectedCount);
  }

  async expectToBeInViewport(locator) {
    await expect(locator).toBeInViewport();
  }

  async expectNotToBeInViewport(locator) {
    await expect(locator).not.toBeInViewport();
  }

  async expectAllRowsHasIcons(locator, { icons = [] } = {}) {
    await locator.first().waitFor();
    const count = await locator.count();
    const iconSelector = icons.map((icon) => `.${icon}`).join(', ');

    for (let i = 0; i < count; i++) {
      await expect(locator.nth(i).locator(iconSelector)).toBeVisible();
    }
  }

  async waitVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async waitHidden(locator) {
    await locator.waitFor({ state: 'hidden' });
  }

  async #retry(action, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await action();
      } catch (e) {
        if (i === attempts - 1) throw e;
      }
    }
  }

  async pressKeyboardButton({ button, count = 1 } = {}) {
    for (let i = 0; i < count; i++) {
      await this.page.keyboard.press(button);
    }
  }

  async expectUrl({ url } = {}) {
    await expect(this.page).toHaveURL(new RegExp(escapeRegExp(url)));
  }

  async expectNotUrl({ url } = {}) {
    await expect(this.page).not.toHaveURL(new RegExp(escapeRegExp(url)));
  }

  async expectClipboardText({ text: expectedText } = {}) {
    const text = await this.page.evaluate(() => navigator.clipboard.readText());
    expect(cleanString(text)).toBe(cleanString(expectedText));
  }

  async expectClipboardToContainText({ text: expectedText } = {}) {
    const text = await this.page.evaluate(() => navigator.clipboard.readText());
    expect(cleanString(text)).toContain(cleanString(expectedText));
  }

  async toHaveCss(locator, { name, value } = {}) {
    await expect(locator).toHaveCSS(name, value);
  }

  async notToHaveCss(locator, { name, value } = {}) {
    await expect(locator).not.toHaveCSS(name, value);
  }

  async scrollIntoViewIfNeeded(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async expectAttribute(locator, { attribute, value } = {}) {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  async expectMultiAttribute(locator, { attribute, values = [] } = {}) {
    const string = values.join('|');
    const pattern = new RegExp(string);
    await expect(locator).toHaveAttribute(attribute, pattern);
  }

  async getAttribute(locator, { attr } = {}) {
    return locator.getAttribute(attr);
  }

  async getValue(locator) {
    await locator.waitFor({ state: 'visible' });
    return await locator.inputValue();
  }

  async checkTextSorted({ columnTexts, direction = 'asc', locale = 'ru' } = {}) {
    const actual = columnTexts.map((text) => text.replace(/\s+/g, ' ').trim());

    if (direction === 'default') {
      return;
    }

    const expected = [...actual].sort((a, b) => a.localeCompare(b, locale, { numeric: true, sensitivity: 'base' }));

    if (direction === 'desc') {
      expected.reverse();
    }

    expect(actual).toEqual(expected);
  }

  async countToBeGreaterThan(locator, { value } = {}) {
    const count = await locator.count();
    expect(count).toBeGreaterThan(value);
  }

  async visibleCount(locator) {
    return await locator.locator('visible=true').count();
  }
}