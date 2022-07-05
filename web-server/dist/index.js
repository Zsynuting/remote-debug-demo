"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_websocket_1 = __importDefault(require("koa-websocket"));
const router_1 = __importDefault(require("./router"));
const ws_router_1 = __importDefault(require("./ws-router"));
const app = (0, koa_websocket_1.default)(new koa_1.default());
app.ws.use(ws_router_1.default);
app.use((0, koa_static_1.default)('./inspector'));
app.use((0, koa_bodyparser_1.default)());
app.use(router_1.default.routes());
app.use(router_1.default.allowedMethods());
app.listen(3033, () => console.log('server is running at http://localhost:3033'));
//# sourceMappingURL=index.js.map