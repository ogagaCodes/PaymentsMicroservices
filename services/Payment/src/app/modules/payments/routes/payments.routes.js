const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const validateRequest = require("../../../middlewares/vallidate");

// validator
const DepositFundsSchema = require("../../../validators/payments/depositFunds.validator");

// controller
const DepositFundsController = require("../controllers/");

const router = Router();

router.post(
  "/pay",
  authorize(["user"]),
  validateRequest(UserDetails.getUserByIdQuerySchema, "body"),
  UserDeatailController.getAUser
);

module.exports = router;
