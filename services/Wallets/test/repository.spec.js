const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");

const userWalletRepository = require("../src/app/modules/wallets/repository/wallet.repository");

const UserWalletModel = require("../src/app/modules/wallets/models/wallet.model");

describe("User Wallet Repository", function () {
  describe("Create Wallet Success", function () {
    it("it should create a User Wallet", async function () {
      const spyValue = {
        user_phone_number: faker.phone.number(),
        user_id: faker.random.alphaNumeric(),
        user_email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const stub = sinon.stub(UserWalletModel, "create").returns(spyValue);
      const userWallet = await userWalletRepository.create(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(userWallet.user_phone_number).to.be.equal(spyValue.user_phone_number);
      expect(userWallet.user_email).to.be.equal(spyValue.user_email);
    });
  });
  describe("Fetch User Wallet: Success", function () {
    it("it should Fetch A User Wallet", async function () {
      const spyValue = {
        user_email: faker.internet.email(),
      };
      const stub = sinon.stub(UserWalletModel, "findOne").returns(spyValue);
      const userWallet = await userWalletRepository.findOne(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(userWallet.user_email).to.be.equal(spyValue.user_email);
    });
  });
});