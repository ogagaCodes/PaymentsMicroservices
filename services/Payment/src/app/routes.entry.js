const { Router } = require("express");
const Payments = require("./modules/payments/routes/payments.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Payments);
  return router;
};
