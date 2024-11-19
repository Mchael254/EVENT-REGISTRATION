"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request_1 = __importDefault(require("request"));
//access token
const accessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        const auth = Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64');
        (0, request_1.default)({
            url: url,
            headers: {
                Authorization: "Basic " + auth,
            },
        }, (error, response, body) => {
            if (error) {
                res.status(401).send({
                    message: 'Something went wrong when trying to process your payment',
                    error: error.message,
                });
            }
            else {
                req.safaricon_access_token = JSON.parse(body).access_token;
                next();
            }
        });
    }
    catch (error) {
    }
});
exports.accessToken = accessToken;
