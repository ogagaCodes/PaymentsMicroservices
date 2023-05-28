const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const  validateRequest  = require("../../../middlewares/vallidate");

const FetchWalletValidator = require("../../../validators/wallets/fetchUsersWallet.vallidator")
const WalletDetailsController = require("../controllers/fetchUserWallet");





const router = Router(); 

router.get(
  "/wallet",
  authorize(['user']),
  validateRequest(FetchWalletValidator.userWalletSchema, "query"),
  WalletDetailsController.walletDetails
);



module.exports = router;
