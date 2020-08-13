"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ClipboardEvent = void 0;
/**
 *
 * @author fuyg
 * @date  2020-08-13
 */
var events = __importStar(require("events"));
var copyPaste = __importStar(require("copy-paste"));
var ClipboardEvent;
(function (ClipboardEvent) {
    ClipboardEvent["change"] = "change";
})(ClipboardEvent = exports.ClipboardEvent || (exports.ClipboardEvent = {}));
var Clipboard = /** @class */ (function (_super) {
    __extends(Clipboard, _super);
    function Clipboard(refreshInterval) {
        if (refreshInterval === void 0) { refreshInterval = 1000; }
        var _this = _super.call(this) || this;
        _this._lastValue = null;
        setInterval(function () { return _this.monitorSystemClipboard(); }, refreshInterval);
        return _this;
    }
    Clipboard.prototype.set = function (text) {
        if (!text) {
            return false;
        }
        this._lastValue = text;
        copyPaste.copy(text);
        return true;
    };
    Object.defineProperty(Clipboard.prototype, "current", {
        get: function () {
            return this._lastValue;
        },
        enumerable: false,
        configurable: true
    });
    Clipboard.prototype.monitorSystemClipboard = function () {
        var _this = this;
        copyPaste.paste(function (e, data) {
            if (e) {
                console.error(e);
            }
            var text = data && data.toString ? data.toString() : '';
            if (!text) {
                return;
            }
            if (text === _this._lastValue) {
                return;
            }
            _this._lastValue = text;
            _this.emit(ClipboardEvent.change, text);
        });
    };
    return Clipboard;
}(events.EventEmitter));
exports.default = Clipboard;
