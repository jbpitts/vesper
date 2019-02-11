"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Uses given validator to validate query / mutation args.
 */
function ArgsValidator(validator) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().validators.push({
            target: object.constructor,
            methodName: methodName,
            validator: validator,
        });
    };
}
exports.ArgsValidator = ArgsValidator;

//# sourceMappingURL=ArgsValidator.js.map
