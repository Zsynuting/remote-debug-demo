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
const koa_route_1 = __importDefault(require("koa-route"));
const proxy_1 = __importDefault(require("./proxy"));
const router = koa_route_1.default.all('/debugProxy/:channelId', (ctx, channelId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('%c 🧀 channelId: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', channelId);
    yield proxy_1.default.bind(ctx.websocket, channelId);
}));
exports.default = router;
//# sourceMappingURL=ws-router.js.map