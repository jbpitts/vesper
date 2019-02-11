"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a class as a graph controller.
 */
function Controller() {
    return function (target) {
        index_1.getMetadataArgsStorage().controllers.push({ target: target });
    };
}
exports.Controller = Controller;

//# sourceMappingURL=Controller.js.map
