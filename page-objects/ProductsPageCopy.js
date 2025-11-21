export class ProductsPageCopy {
  constructor(page) {
    this.page = page;
  }

  visit = async () => {
    await this.page.goto("/");
  };
}
