const { Router } = require("express");
const Payments = require("./modules/user/routes/user.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Payments);
  return router;
};
