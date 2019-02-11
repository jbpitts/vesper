"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a controller method as a GraphQL query.
 */
function Query(options) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().actions.push({
            type: "query",
            target: object.constructor,
            methodName: methodName,
            name: (options && options.name) ? options.name : undefined,
            transaction: (options && options.transaction === true) ? true : false
        });
    };
}
exports.Query = Query;

//# sourceMappingURL=Query.js.map
