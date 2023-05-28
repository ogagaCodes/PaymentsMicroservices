const { Router } = require("express");
const Auth = require("./modules/auth/routes/auth.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Auth);
  return router;
};
