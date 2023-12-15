import express from "express";
import userControllers from "../controllers/userController.js";
// import AuthClass from "../controllers/authetication/authController.js";
const router = express.Router();

router
  .route("/")
  .get(userControllers.getAll)
  .post(userControllers.signUp);

router
  .route("/:id")
  .get(userControllers.getOne)
  .patch(userControllers.updateOne)
  .delete(userControllers.deleteOne);

router.route("/signup").post(userControllers.signUp);
export default router;
