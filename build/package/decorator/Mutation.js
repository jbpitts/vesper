"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a controller method as a GraphQL mutation.
 */
function Mutation(options) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().actions.push({
            type: "mutation",
            target: object.constructor,
            methodName: methodName,
            name: (options && options.name) ? options.name : undefined,
            transaction: (options && options.transaction === false) ? false : true
        });
    };
}
exports.Mutation = Mutation;

//# sourceMappingURL=Mutation.js.map
