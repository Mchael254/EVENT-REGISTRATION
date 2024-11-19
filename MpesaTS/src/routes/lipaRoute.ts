//lipaRoute.ts
import express from "express";
import { generateToken } from "../middleware/generateToken";
import { handleStkPush, stkPushCallback, } from "../controllers/lipanampesa";

const router = express.Router();
router.route("/stkpush").post(generateToken, handleStkPush);  
router.route("/stkPushCallback/:Order_ID").post(stkPushCallback);  

export default router;
