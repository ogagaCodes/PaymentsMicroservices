const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const validateRequest = require("../../../middlewares/vallidate");

// validator
const DepositFundsSchema = require("../../../validators/payments/depositFunds.validator");

// controller
const DepositFundsController = require("../controllers/depositFunds");

const router = Router();

router.post(
  "/pay",
  authorize(["user"]),
  validateRequest(DepositFundsSchema.depositFundsSchema, "body"),
  DepositFundsController.creditWallet
);

module.exports = router;
