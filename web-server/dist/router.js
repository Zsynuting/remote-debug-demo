"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const koa_router_1 = __importDefault(require("koa-router"));
const path_1 = __importDefault(require("path"));
const uuid = __importStar(require("uuid"));
const ip_1 = __importDefault(require("ip"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const proxy_1 = __importDefault(require("./proxy"));
const router = new koa_router_1.default();
const ipAddress = ip_1.default.address();
router.post('/debug', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code = 'console.log(1)' } = ctx.request.body;
    console.log('%c 🍦 code: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', code);
    const fileId = uuid.v4();
    const filePath = path_1.default.resolve(`./temp/${fileId}.js`);
    fs_1.default.writeFileSync(filePath, code, 'utf8');
    const channelId = (yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const debug = (0, child_process_1.spawn)('node', ['--inspect-brk=9222', filePath]);
        debug.on('exit', () => fs_1.default.unlink(filePath, () => console.log(`${filePath} is deleted`)));
        debug.on('spawn', () => __awaiter(void 0, void 0, void 0, function* () {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            const list = (yield (0, node_fetch_1.default)(`http://localhost:9222/json`, { method: 'get' }).then((res) => res.json()));
            const instance = list[0];
            const channelId = instance ? instance.webSocketDebuggerUrl.split('/').pop() || '' : '';
            resolve(channelId);
        }));
    })));
    const debugProxyUrl = `${ipAddress}:3033/debugProxy/${channelId}`;
    const debugUrl = `http://${ipAddress}:3033/js_app.html?ws=${debugProxyUrl}`;
    yield proxy_1.default.registry(channelId);
    ctx.body = {
        debugProxyUrl,
        debugUrl,
    };
    yield next();
}));
exports.default = router;
//# sourceMappingURL=router.js.map