import { faker } from "@faker-js/faker";

function getRandomExpirationDate() {
  // Month 1–12
  const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, "0");

  // Year - the last two digits (for example, 25...35)
  const year = String(faker.number.int({ min: 25, max: 35 }));

  return `${month}/${year}`;
}

export const paymentDetails = {
  cardOwner: faker.person.fullName(),
  cardNumber: faker.finance.creditCardNumber({
    issuer: "444[1-9]-####-####-###L",
  }),
  expirationDate: getRandomExpirationDate(),
  cardCVC: faker.finance.creditCardCVV(),
};
