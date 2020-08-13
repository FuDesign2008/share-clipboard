"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @author fuyg
 * @date  2020-08-13
 */
var socketIo = __importStar(require("socket.io-client"));
var clipboard_1 = __importStar(require("./clipboard"));
var socket_1 = require("./socket");
function createSocket(url) {
    var socket = socketIo.connect(url);
    socket.on('connect', function () {
        console.log("Connected to a server " + url);
    });
    socket.on('disconnect', function () {
        console.log("Disconnected from a server " + url);
    });
    return socket;
}
function createClient(host, port) {
    if (port === void 0) { port = 8989; }
    var url = "http://" + host + ":" + port;
    var clipboard = new clipboard_1.default();
    var socket = createSocket(url);
    socket.on(socket_1.SocketEvent.paste, function (text) {
        console.info("Received clipboard from server: " + text);
        clipboard.set(text);
    });
    clipboard.on(clipboard_1.ClipboardEvent.change, function (text) {
        return socket.emit(socket_1.SocketEvent.paste, text);
    });
}
exports.default = createClient;
