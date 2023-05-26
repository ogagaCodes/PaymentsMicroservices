const { Router } = require("express");
const Wallets = require("./modules/wallets/routes/wallet.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Wallets);
  return router;
};
