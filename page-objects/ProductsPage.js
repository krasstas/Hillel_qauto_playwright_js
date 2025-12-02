import { HeaderPage } from "./HeaderPage.js";
import { isDesktopViewport } from "../utils/isDesktopViewport";
import { expect } from "@playwright/test";
export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/", { timeOut: 1000 });
  };

  addItemToCart = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    const headerPage = new HeaderPage(this.page);

    // A variable declared with 'let' can be created without an initial value and assigned later.
    let cartCountBeforAdding;
    if (isDesktopViewport(this.page)) {
      cartCountBeforAdding = await headerPage.getCartCount();
    }
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    if (isDesktopViewport(this.page)) {
      const cartCountAfterAdding = await headerPage.getCartCount();
      expect(cartCountAfterAdding).toBeGreaterThan(cartCountBeforAdding);
    }
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
  };
}
