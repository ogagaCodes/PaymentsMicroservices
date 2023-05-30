const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");

const userRepository = require("../src/app/modules/user/repository/user.repository");

const UserModel = require("../src/app/modules/user/models/user.model");

describe("User Repository", function () {
  describe("Create User Success", function () {
    it("it should create a User", async function () {
      const spyValue = {
        user_phone_number: faker.phone.number(),
        user_id: faker.random.alphaNumeric(),
        user_email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const stub = sinon.stub(UserModel, "create").returns(spyValue);
      const user = await userRepository.create(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(user.user_phone_number).to.be.equal(spyValue.user_phone_number);
      expect(user.user_email).to.be.equal(spyValue.user_email);
    });
  });
  describe("Fetch User: Success", function () {
    it("it should Fetch A User", async function () {
      const spyValue = {
        username: faker.internet.email(),
      };
      const stub = sinon.stub(UserModel, "findOne").returns(spyValue);
      const user = await userRepository.findOne(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(user.username).to.be.equal(spyValue.username);
    });
  });
});