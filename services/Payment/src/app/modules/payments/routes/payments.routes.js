const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const validateRequest = require("../../../middlewares/vallidate");

// validator
const FnudWalletSchema = require("../../../validators/payments/fundWallet.validator");

// controller
const FundWalletController = require("../controllers/fundWallet");

const router = Router();

router.post(
  "/pay",
  authorize(["user"]),
  validateRequest(FnudWalletSchema.fundWalletSchema, "body"),
  FundWalletController.creditWallet
);

module.exports = router;
