"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utilities to work with resolving data.
 */
var ResolverUtils = /** @class */ (function () {
    function ResolverUtils() {
    }
    /**
     * Groups given entities by a given ids.
     */
    ResolverUtils.groupByMany = function (originalIds, entities, property) {
        var group = originalIds.reduce(function (group, id) {
            group[id] = [];
            return group;
        }, {});
        entities.forEach(function (entity) {
            var value = property instanceof Function ? property(entity) : property;
            if (value instanceof Array) {
                value.forEach(function (propertyId) {
                    if (group[propertyId]) // handle situation when there is a property id without group?
                        group[propertyId].push(entity);
                });
            }
        });
        return originalIds.map(function (id) { return group[id]; });
    };
    return ResolverUtils;
}());
exports.ResolverUtils = ResolverUtils;

//# sourceMappingURL=ResolverUtils.js.map
