import { UIFacade } from '../frameworks/ui.facade.js';
import { SmartActions } from '../frameworks/smart.actions.js';

export class BaseComponent {
  constructor(page, locator) {
    this.page = page;
    this.locator = locator;
    this.actions = new SmartActions(page);
  }

  getLocator(selector) {
    return this.locator.locator(selector);
  }

  get ui() {
    return new UIFacade(this.page, this.locator);
  }

  async click({ force = false } = {}) {
    await this.actions.click(this.locator, { force });
  }

  async clear() {
    await this.actions.clear(this.locator);
  }

  async clickWithMovePosition({ option } = {}) {
    await this.actions.clickWithMovePosition(this.locator, { option });
  }

  async hover({ timeout, force } = {}) {
    await this.actions.hover(this.locator, { timeout, force });
  }

  async fill({ value, force = false } = {}) {
    await this.actions.fill(this.locator, value, { force });
    return this;
  }

  async type({ value, delay = 50 } = {}) {
    await this.actions.type(this.locator, value, { delay });
    return this;
  }

  async pressSequentially({ value } = {}) {
    await this.actions.pressSequentially(this.locator, value);
  }

  async text() {
    return await this.actions.text(this.locator);
  }

  async html() {
    return await this.actions.html(this.locator);
  }

  async count() {
    return await this.actions.count(this.locator);
  }

  async openInNewTab({ auth = false } = {}) {
    return await this.actions.openInNewTab(this.locator, { auth });
  }

  async shouldBeVisible() {
    await this.actions.expectVisible(this.locator);
  }

  async hasNoChildWithClass({ className } = {}) {
    await this.actions.hasNoChildWithClass(this.locator, { className });
  }

  async hasChildWithClass({ className } = {}) {
    await this.actions.hasChildWithClass(this.locator, { className });
  }

  async hasInputValue({ value, exact = true } = {}) {
    await this.actions.hasInputValue(this.locator, { value, exact });
  }

  async isVisible() {
    await this.actions.isVisible(this.locator);
  }

  async isHidden({ timeout } = {}) {
    await this.actions.isHidden(this.locator, { timeout });
  }

  async expectChecked() {
    await this.actions.expectChecked(this.locator);
  }

  async expectNotChecked() {
    await this.actions.expectNotChecked(this.locator);
  }

  async expectText({ text, ignoreRegister = false, fullExact = false } = {}) {
    await this.actions.expectText(this.locator, { text, ignoreRegister, fullExact });
  }

  async expectOneOfTexts({ texts } = {}) {
    await this.actions.expectOneOfTexts(this.locator, { texts });
  }

  async expectNotContainText({ text } = {}) {
    await this.actions.expectNotContainText(this.locator, { text });
  }

  async expectClass({ className } = {}) {
    await this.actions.expectClass(this.locator, { className });
  }

  async expectNoClass({ className } = {}) {
    await this.actions.expectNoClass(this.locator, { className });
  }

  async expectUrl({ url } = {}) {
    await this.actions.expectUrl({ url });
  }

  async expectNotUrl({ url } = {}) {
    await this.actions.expectNotUrl({ url });
  }

  async expectCount({ count } = {}) {
    await this.actions.expectCount(this.locator, { count });
  }

  async expectAttribute({ attribute, value } = {}) {
    await this.actions.expectAttribute(this.locator, { attribute, value });
  }

  async expectMultiAttribute({ attribute, values = [] } = {}) {
    await this.actions.expectMultiAttribute(this.locator, { attribute, values });
  }

  async expectAllRowsHasIcons({ icons = [] } = {}) {
    await this.actions.expectAllRowsHasIcons(this.locator, { icons });
  }

  async waitVisible() {
    await this.actions.waitVisible(this.locator);
  }

  async waitHidden() {
    await this.actions.waitHidden(this.locator);
  }

  async pressKeyboardButton({ button, count = 1 } = {}) {
    await this.actions.pressKeyboardButton({ button, count });
  }

  async expectToBeInViewport() {
    await this.actions.expectToBeInViewport(this.locator);
  }

  async expectNotToBeInViewport() {
    await this.actions.expectNotToBeInViewport(this.locator);
  }

  async expectClipboardText({ text } = {}) {
    await this.actions.expectClipboardText({ text });
  }

  async expectClipboardToContainText({ text } = {}) {
    await this.actions.expectClipboardToContainText({ text });
  }

  async toHaveCss({ name, value } = {}) {
    await this.actions.toHaveCss(this.locator, { name, value });
  }

  async notToHaveCss({ name, value } = {}) {
    await this.actions.notToHaveCss(this.locator, { name, value });
  }

  async scrollIntoViewIfNeeded() {
    await this.actions.scrollIntoViewIfNeeded(this.locator);
  }

  nth(index) {
    return new BaseComponent(this.page, this.locator.nth(index));
  }

  async getAttribute({ attr } = {}) {
    return await this.actions.getAttribute(this.locator, { attr });
  }

  async getValue() {
    return await this.actions.getValue(this.locator);
  }

  async countToBeGreaterThan({ value } = {}) {
    await this.actions.countToBeGreaterThan(this.locator, { value });
  }

  async visibleCount() {
    return await this.actions.visibleCount(this.locator);
  }
}