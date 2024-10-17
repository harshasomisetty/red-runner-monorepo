const faker = require('faker');

const createTestUser = () => ({
  userId: faker.datatype.uuid(), // This simulates a Firebase UID
  tokenId: faker.datatype.uuid(), // This simulates a Firebase token
  email: faker.internet.email().toLowerCase(),
});

const userOne = createTestUser();
const userTwo = createTestUser();
const admin = createTestUser();

module.exports = {
  userOne,
  userTwo,
  admin,
  createTestUser,
};
