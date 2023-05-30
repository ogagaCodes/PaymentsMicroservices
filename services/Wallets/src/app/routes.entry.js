const { Router } = require("express");
const Wallets = require("./modules/wallets/routes/wallets.routes");
const SavingsPlan = require("./modules/savingsPlan/routes/savingsPlan.routes");






module.exports = () => {
  const router = Router();
  router.use("/wallets", Wallets);
  router.use("/savingsPlan", SavingsPlan);

  return router;
};
