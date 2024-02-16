import express from "express"
import {getUsers, updateMe} from "../controllers/userController.js"
import { protect} from "../controllers/authController.js";


const router = express.Router();

router.patch("/update-me", protect, updateMe)
router.post("get-users",protect,getUsers)





export default router