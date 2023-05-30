const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorise");
const validateRequest = require("../../../middlewares/vallidate");

// validator
const AddSavingsPlanValidator = require("../../../validators/savingsPlan/addSavingsPlan.validator");
const FetchSavingsPlanValidator = require("../../../validators/savingsPlan/fetchUsersSavingsPlan.validator");


// controller
const AddSavingsPlanController = require("../controllers/addPlan");
const FetchUsersSavingsPlanController = require("../controllers/fetchUsersSavingsPlan");


const router = Router();

router.post(
    "/",
    authorize(["user"]),
    validateRequest(AddSavingsPlanValidator.addSavingsPlanSchema, "body"),
    AddSavingsPlanController.addSavingsPlan
  );

router.get(
  "/",
  authorize(["user"]),
  validateRequest(FetchSavingsPlanValidator.userSavingsPlanSchema, "query"),
  FetchUsersSavingsPlanController.savingsPlanDetails
);

module.exports = router;
