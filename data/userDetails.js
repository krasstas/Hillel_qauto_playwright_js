import { faker } from "@faker-js/faker";

// Generating a valid password with rules
const generateValidPassword = () => {
  let password = faker.internet.password({
    length: faker.number.int({ min: 8, max: 15 }),
    exclude: " ",
  });

  while (
    !/[a-z]/.test(password) || // At least one lowercase
    !/[A-Z]/.test(password) || // At least one Uppercase
    !/\d/.test(password) // At least one digit
  ) {
    password = faker.internet.password({
      length: faker.number.int({ min: 8, max: 15 }),
      exclude: " ",
    });
  }

  return password;
};

export const userRegistrationDetails = {
  email: faker.internet.email({ provider: "testmail.com" }),
  password: generateValidPassword(),
};

export const userApiLoginDetails = {
  login: "q@q",
  password: process.env.ADMIN_PASSWORD,
};
