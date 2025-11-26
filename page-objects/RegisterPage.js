// import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder("E-Mail");
    this.passwordInput = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signUpAsNewUser = async () => {
    await this.emailInput.waitFor();
    // const emailId = uuidv4();
    // const email = emailId + "@testmail.com";
    const email = faker.internet.email({ provider: "testmail.com" });
    this.emailInput.fill(email);
    await this.passwordInput.waitFor();

    let pswrd = faker.internet.password({
      length: faker.number.int({ min: 8, max: 15 }),
      exclude: " ",
    });
    while (!/[a-z]/.test(pswrd) || !/[A-Z]/.test(pswrd) || !/\d/.test(pswrd)) {
      pswrd = faker.internet.password({
        length: faker.number.int({ min: 8, max: 15 }),
        exclude: " ",
      });
    }

    const password = pswrd;
    this.passwordInput.fill(password);
    await this.registerButton.waitFor();
    await this.page.pause();
    this.registerButton.click();
  };
}
