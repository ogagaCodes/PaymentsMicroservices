const { Router } = require("express");
const Users = require("./modules/user/routes/user.routes");





module.exports = () => {
  const router = Router();
  router.use("/", Users);
  return router;
};
