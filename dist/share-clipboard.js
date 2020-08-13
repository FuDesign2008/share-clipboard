"use strict";
/**
 *
 * @author fuyg
 * @date  2020-08-13
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = __importDefault(require("./lib/Server"));
var Client_1 = __importDefault(require("./lib/Client"));
var defaultHost = '0.0.0.0';
var defaultPort = 8989;
if (process.argv.length == 3) {
    // node ./share-clipboard.js  host
    var host = process.argv[2];
    Client_1.default(host, defaultPort);
}
else {
    // node ./share-clipboard.js
    Server_1.default(defaultHost, defaultPort);
}
