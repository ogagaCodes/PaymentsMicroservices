const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
const  validateRequest  = require("../../../middlewares/vallidateRequest");
const CreateWallet = require("../../../vallidators/wallets/createWallet.validator");
const AllWallets = require("../../../vallidators/wallets/getAllWallets.validator");
const DebitWallet = require("../../../vallidators/wallets/debitWallet.validator.js");
// const InitiateWalletDebit = require("../../../vallidators/wallets/initiateWalletDebit.vallidator");
const CreditWallet = require("../../../vallidators/wallets/creditWallet.vallidator");
// const UpdateUserImage = require("../../../vallidators/user/updateUserImage.validator");
const CreateWalletController = require("../controllers/createWallet.controller");
const WalletDetailsController = require("../controllers/walletDetails.controller");
const AllWalletController = require("../controllers/getAllWallets.controller");
// const InitiateWalletDebitController = require("../controllers/initiateWalletDebit.controller");
const DebitWalletController = require("../controllers/debitWallet.controller");
const CreditWalletController = require("../controllers/creditWallet.controller.js");
const UtilityController = require("../controllers/utility");





const router = Router(); 

router.get(
  "/wallet",
  authorize(['admin', 'minder', 'user']),
  WalletDetailsController.walletDetails
);



module.exports = router;
