"use strict";
/**
 *
 * @author fuyg
 * @date  2020-08-13
 */
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
var http = __importStar(require("http"));
var socketIo = __importStar(require("socket.io"));
var clipboard_1 = __importStar(require("./clipboard"));
var socket_1 = require("./socket");
var os = __importStar(require("os"));
var ifaces = os.networkInterfaces();
function createSocket(host, port, handleClientSocket) {
    console.log("Starting server: ");
    if (host !== '0.0.0.0') {
        console.info(host + ":" + port);
    }
    else {
        Object.keys(ifaces).forEach(function (dev) {
            var arr = ifaces && ifaces[dev] ? ifaces[dev] : [];
            if (arr) {
                arr.forEach(function (details) {
                    if (details.family === 'IPv4') {
                        console.info(details.address + ":" + port);
                    }
                });
            }
        });
    }
    var server = http.createServer();
    var io = socketIo.listen(server);
    io.on('connection', function (client) {
        var remoteAddress = client.conn.remoteAddress;
        console.log("Client " + remoteAddress + " is connected");
        client.on('disconnect', function () {
            console.log("Client " + remoteAddress + " is disconnected");
        });
        handleClientSocket(client);
    });
    server.listen(port, host);
}
function createServer(host, port) {
    if (host === void 0) { host = 'localhost'; }
    if (port === void 0) { port = 8989; }
    var clipboard = new clipboard_1.default();
    createSocket(host, port, function (client) {
        client.on(socket_1.SocketEvent.paste, function (text) {
            console.info("Received clipboard: " + text);
            clipboard.set(text);
        });
        clipboard.on(clipboard_1.ClipboardEvent.change, function (text) {
            return client.emit(socket_1.SocketEvent.paste, text);
        });
        client.emit(socket_1.SocketEvent.paste, clipboard.current);
    });
}
exports.default = createServer;
