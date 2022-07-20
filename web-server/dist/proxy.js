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
const ws_1 = __importDefault(require("ws"));
const map = new Map();
exports.default = {
    bind(clientWs, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ws = map.get(channelId);
            ws.on('message', (data) => {
                const msg = data.toString();
                console.log('debugging runtime respond:', JSON.parse(msg));
                clientWs.send(msg);
            });
            clientWs.on('message', (data) => {
                const msg = data.toString();
                console.log('devtools UI sent:', JSON.parse(msg));
                ws.send(msg);
            });
        });
    },
    registry(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => {
                const ws = new ws_1.default(`ws://localhost:9229/${channelId}`);
                ws.on('open', () => {
                    console.log('open');
                    map.set(channelId, ws);
                    resolve(null);
                });
            });
        });
    },
};
//# sourceMappingURL=proxy.js.map