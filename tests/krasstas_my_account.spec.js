import { expect, test } from "@playwright/test";
import { MyAccount } from "../page-objects/MyAccount.js";

test("My account using coockie injection", async () => {
  const myAccount = new MyAccount(page);
});
