const { Router } = require("express");
const validateRequest = require("../../../middlewares/vallidate");
const { authorize } = require("../../../middlewares/authoriseUser")

const loginSchema = require("../../../validators/auth/login.validator");
const signUpSchema = require("../../../validators/auth/signup.validator");

const loginController = require("../controllers/login");
const validateTokenController = require("../controllers/validateToken");
const signUpController = require("../controllers/signup");



const router = Router();
router.post(
  "/register",
  validateRequest(signUpSchema.registerUserSchema, "body"),
  signUpController.signUp
);

router.post(
  "/login",
  validateRequest(loginSchema.loginUserSchema, "body"),
  loginController.login
);

router.get(
  "/validate-token",
  authorize(['user','org']),
  validateTokenController.validate
);



module.exports = router;
