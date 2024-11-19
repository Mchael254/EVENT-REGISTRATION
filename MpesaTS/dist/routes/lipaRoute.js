"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//lipaRoute.ts
const express_1 = __importDefault(require("express"));
const generateToken_1 = require("../middleware/generateToken");
const lipanampesa_1 = require("../controllers/lipanampesa");
const router = express_1.default.Router();
router.route("/stkpush").post(generateToken_1.generateToken, lipanampesa_1.handleStkPush);
router.route("/stkPushCallback/:Order_ID").post(lipanampesa_1.stkPushCallback);
exports.default = router;
