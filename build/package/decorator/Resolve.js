"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Used in resolvers to mark method as resolving some data.
 */
function Resolve(options) {
    return function (object, propertyName) {
        var paramTypes = Reflect.getMetadata("design:paramtypes", object, propertyName);
        var isMany = paramTypes && paramTypes[0] === Array;
        index_1.getMetadataArgsStorage().resolves.push({
            target: object.constructor,
            methodName: propertyName,
            name: (options && options.name) ? options.name : undefined,
            dataLoader: isMany
        });
    };
}
exports.Resolve = Resolve;

//# sourceMappingURL=Resolve.js.map
