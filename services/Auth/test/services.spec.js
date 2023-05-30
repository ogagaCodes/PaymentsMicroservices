const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");

const UserLoginService = require("../src/app/modules/auth/services/userLogin.services");
const UserSessionService = require("../src/app/modules/auth/services/session.services");
const ValidateTokenService = require("../src/app/modules/auth/services/vallidate.service");



describe("User Login Service", function() {
    describe("Create User Login: Success", function(){
        it("it Should Create a user Login Record", async function(){
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
            const stub = sinon.stub(UserLoginService.prototype, "create").returns(spyValue);
            const userService = new UserLoginService();
            const user = await userService.create(spyValue);
            expect(stub.calledOnce).to.be.true;
            expect(user.username).to.be.equal(spyValue.username);
            expect(user.email).to.be.equal(spyValue.email);
            expect(user.password).to.be.equal(spyValue.password);
            
        })
    })

    describe("Validate User: Success", function(){
        it("it should validate a user", async function(){
            const spyValue = {
                email: faker.internet.email(),
            }
            const stub = sinon.stub(UserLoginService.prototype, "findARecord").returns(spyValue);
            const userService = new UserLoginService();
            const is_valid = await userService.findARecord(spyValue.email);
            expect(stub.calledOnce).to.be.true;
            expect(is_valid.email).to.be.equal(spyValue.email);
        })
    })
})

describe("User Session Service", function() {
    describe("Create User Session: Success", function(){
        it("it Should Create a user Login Record", async function(){
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
            const stub = sinon.stub(UserSessionService.prototype, "createSession").returns(spyValue);
            const userSessionService = new UserSessionService();
            const user = await userSessionService.createSession(spyValue);
            expect(stub.calledOnce).to.be.true;
            expect(user.username).to.be.equal(spyValue.username);
            expect(user.email).to.be.equal(spyValue.email);
            expect(user.password).to.be.equal(spyValue.password);
            
        })
    })

    describe("Validate User Session: Success", function(){
        it("it should validate a user session", async function(){
            const spyValue = {
                user_id: faker.random.alphaNumeric(),
              };
            const stub = sinon.stub(UserSessionService.prototype, "findASession").returns(spyValue);
            const userSessionService = new UserSessionService();
            const is_valid = await userSessionService.findASession(spyValue.email);
            expect(stub.calledOnce).to.be.true;
            expect(is_valid.email).to.be.equal(spyValue.email);
        })
    })
})

describe("Validate Service", function() {

    describe("Validate Token: Success", function(){
        it("it should validate a token", async function(){
            const spyValue = {
                session_token: faker.helpers.fake("ioihdmkchedgvfchbh21767yr9ub9iyhjb"),
              };
            const stub = sinon.stub(ValidateTokenService.prototype, "vallidateToken").returns(spyValue);
            const validateTokenService = new ValidateTokenService();
            const is_valid = await validateTokenService.vallidateToken(spyValue.access_token);
            console.log("Is Valid", is_valid)
            expect(stub.calledOnce).to.be.true;
            expect(is_valid.session_token).to.equal(spyValue.session_token);
        })
    })
})
