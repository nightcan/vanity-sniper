"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOKS = exports.URL_SNIPER_SELF_TOKEN = exports.SNIPER_SELF_TOKEN = exports.SNIPER_GUILD_ID = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.SNIPER_GUILD_ID = "1135880523999358976";
exports.SNIPER_SELF_TOKEN = "";
exports.URL_SNIPER_SELF_TOKEN = "";
exports.WEBHOOKS = {
    SUCCESS: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1125821654573011005/QwDkE-Jm4t_oICN87raq7P_CV7r58lUZkUQTu8NqCcmGYfZLPnjQWaEbW6Yx5WU2LsJr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "cancanxan",
            }),
        });
    },
    INFO: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1125821588147798156/lFfnQ6bVR3BG92LkoAKw75XjWaA4EhqkH2zhr31gcqMD_4bDEgicLreswvrcSX-eVLCX`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "kuruldu",
            }),
        });
    },
    FAIL: async (content) => {
        await (0, node_fetch_1.default)(`https://discord.com/api/webhooks/1125821732511551551/jzLRCvl_-ovGdR52kSjnl9eVVTOcpmf38I2o10jRL9Y-keuDNB7kd1qs5b10tsC_Z6Wf`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                username: "hasiktir",
            }),
        });
    },
};
