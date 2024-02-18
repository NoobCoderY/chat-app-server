import express from "express"
import {getFriends, getRequests, getUsers, updateMe} from "../controllers/userController.js"
import { protect} from "../controllers/authController.js";


const router = express.Router();

router.patch("/update-me", protect, updateMe)
router.post("get-users", protect, getUsers)
router.get("/get-requests", protect, getRequests);
router.get("/get-friends", protect, getFriends);






export default router