const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const WalletDetailsController = require("../controllers/fetchUserWallet");





const router = Router(); 

router.get(
  "/user",
  authorize(['user']),
  WalletDetailsController.walletDetails
);



module.exports = router;
