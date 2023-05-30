const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");

const UserWalletService = require("../src/app/modules/wallets/services/wallet.services");



describe("User Login Service", function() {
    describe("Create A User Wallet: Success", function(){
        it("it Should Create a user Wallet", async function(){
            const spyValue = {
                user_phone_number: faker.phone.number(),
                user_id: faker.random.alphaNumeric(),
                user_email: faker.internet.email(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
              };
            const stub = sinon.stub(UserWalletService.prototype, "CreateWallet").returns(spyValue);
            const userWalletService = new UserWalletService();
            const userWallet = await userWalletService.CreateWallet(spyValue);
            expect(stub.calledOnce).to.be.true;
            expect(userWallet.user_phone_number).to.be.equal(spyValue.user_phone_number);
            expect(userWallet.user_email).to.be.equal(spyValue.user_email);
            
        })
    })

    describe("Fetch A User Wallet: Success", function(){
        it("it should Fetch a user Wallet", async function(){
            const spyValue = {
                user_email: faker.internet.email(),
              };
            const stub = sinon.stub(UserWalletService.prototype, "findWallet").returns(spyValue);
            const userWalletService = new UserWalletService();
            const is_valid = await userWalletService.findWallet(spyValue.user_email);
            expect(stub.calledOnce).to.be.true;
            expect(is_valid.user_email).to.be.equal(spyValue.user_email);
        })
    })
})
