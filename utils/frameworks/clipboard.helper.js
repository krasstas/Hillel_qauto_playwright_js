// --- FILE: clipboard.helper.js ---

export class ClipboardHelper {
  constructor(page) {
    this.page = page;
  }

  async intercept() {
    await this.page.addInitScript(() => {
      const originalWrite = navigator.clipboard.writeText;

      navigator.clipboard.writeText = async (text) => {
        window.__copiedText = text;
        if (originalWrite) {
          return originalWrite.call(navigator.clipboard, text);
        }
      };
    });
  }

  async getCopiedText() {
    return await this.page.evaluate(() => window.__copiedText);
  }

  async expectCopiedText({ expected } = {}) {
    await this.page.waitForFunction(
      (value) => window.__copiedText === value,
      expected
    );
  }
}