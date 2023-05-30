const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");

const userLoginRepository = require("../src/app/modules/auth/repository/userLogin.repository");
const userSessionRepository = require("../src/app/modules/auth/repository/session.repository");

const UserLoginModel = require("../src/app/modules/auth/models/userLogin.model");
const UserSessionModel = require("../src/app/modules/auth/models/session.model");

describe("User Login Repository", function () {
  describe("Create Login Entry Success", function () {
    it("it should create a User Login Entry", async function () {
      const spyValue = {
        username: faker.name.fullName(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.number(),
        user_id: faker.random.alphaNumeric(),
        user_type: "user",
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        password: faker.helpers.fake("hvihdvbchvbhvfchbh21767yr9ubbrfhjb"),
      };
      const stub = sinon.stub(UserLoginModel, "create").returns(spyValue);
      const user = await userLoginRepository.create(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(user.username).to.be.equal(spyValue.username);
      expect(user.email).to.be.equal(spyValue.email);
      expect(user.password).to.be.equal(spyValue.password);
    });
  });
  describe("Validate User Login: Success", function () {
    it("it should Validate a user Login Record", async function () {
      const spyValue = {
        email: faker.internet.email(),
      };
      const stub = sinon.stub(UserLoginModel, "findOne").returns(spyValue);
      const user = await userLoginRepository.findOne(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(user.email).to.be.equal(spyValue.email);
    });
  });
});

describe("User Session Repository", function () {
  describe("Create User Seesion Success", function () {
    it("it should create a User Session", async function () {
      const spyValue = {
        session_id: faker.helpers.fake("hvihdvbchvbhvfchbh21767yr9ubbrfhjb"),
        session_token: faker.helpers.fake("ioihdmkchedgvfchbh21767yr9ub9iyhjb"),
        first_name: faker.name.firstName(),
        lats_name: faker.name.lastName(),
        email: faker.internet.email(),
        user_id: faker.random.alphaNumeric(),
        is_active:faker.datatype.boolean(),
        iat: faker.datatype.number(),
        long:faker.address.longitude(),
        lat:faker.address.latitude(),
        logged_in_time: faker.date.recent(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const stub = sinon.stub(UserSessionModel, "create").returns(spyValue);
      const userSession = await userSessionRepository.create(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(userSession.session_id).to.be.equal(spyValue.session_id);
      expect(userSession.email).to.be.equal(spyValue.email);
      expect(userSession.session_token).to.be.equal(spyValue.session_token);
    });
  });
  describe("Validate User Session: Success", function () {
    it("it should validate a User Session", async function () {
      const spyValue = {
        user_id: faker.random.alphaNumeric(),
      };
      const stub = sinon.stub(UserSessionModel, "findOne").returns(spyValue);
      const userSession = await userSessionRepository.findOne(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(userSession.user_id).to.be.equal(spyValue.user_id);
    });
  });
});
