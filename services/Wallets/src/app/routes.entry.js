const { Router } = require("express");
const Wallets = require("./modules/wallets/routes/wallets.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Wallets);
  return router;
};
