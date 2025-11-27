import { faker } from "@faker-js/faker";

export const deliveryDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  street: faker.location.streetAddress(),
  postCode: faker.location.zipCode(),
  city: faker.location.city(),
};
