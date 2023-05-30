const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");

// controller
const UserDeatailController = require("../controller/fetchUserDetails");

const router = Router();

router.get(
  "/user/:id",
  authorize(["user"]),
  UserDeatailController.getAUser
);

module.exports = router;
