"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a controller method as a GraphQL subscription.
 */
function Subscription(options) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().actions.push({
            type: "subscription",
            target: object.constructor,
            methodName: methodName,
            name: (options && options.name) ? options.name : undefined,
            transaction: (options && options.transaction === true) ? true : false
        });
    };
}
exports.Subscription = Subscription;

//# sourceMappingURL=Subscription.js.map
