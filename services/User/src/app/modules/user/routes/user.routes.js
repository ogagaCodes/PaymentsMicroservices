const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const validateRequest = require("../../../middlewares/vallidate");

// validator
const UserDetails = require("../../../validators/users/fetchUser.validator");

// controller
const UserDeatailController = require("../controller/fetchUserDetails");

const router = Router();

router.get(
  "/user/:id",
  authorize(["user"]),
  validateRequest(UserDetails.getUserByIdQuerySchema, "params"),
  UserDeatailController.getAUser
);

module.exports = router;
