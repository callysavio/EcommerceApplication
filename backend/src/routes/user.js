import express from "express";
const router = express.Router();
import { registerUser, fetchUsers, loginUser } from "../controllers/userController.js";
// import { authorizeUser } from "../middlewares/authentication.js";

router.route("/register").post(registerUser);
router.route("/all-users").get(fetchUsers);
router.route("/login").post(loginUser);



export default router;
