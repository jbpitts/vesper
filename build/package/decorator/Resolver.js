"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Register a resolver for a given model.
 */
function Resolver(name) {
    return function (target) {
        index_1.getMetadataArgsStorage().resolvers.push({
            target: target,
            name: name
        });
    };
}
exports.Resolver = Resolver;

//# sourceMappingURL=Resolver.js.map
