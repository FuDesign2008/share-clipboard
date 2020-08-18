"use strict";
/**
 *
 * @author fuyg
 * @date  2020-08-18
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortText = void 0;
function shortText(text) {
    return text && text.length && text.length > 20
        ? text.substr(0, 17) + '...'
        : text;
}
exports.shortText = shortText;
