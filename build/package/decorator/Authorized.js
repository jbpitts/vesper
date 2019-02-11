"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Marks query / mutation to have a special access.
 * It usually means it requires user authorization or some specific user role.
 * Authorization logic must be defined in the framework settings.
 */
function Authorized(roles) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().authorizes.push({
            target: object.constructor,
            methodName: methodName,
            roles: roles ? roles : []
        });
    };
}
exports.Authorized = Authorized;

//# sourceMappingURL=Authorized.js.map
