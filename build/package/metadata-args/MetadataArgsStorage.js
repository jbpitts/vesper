"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Storage all metadatas read from decorators.
 */
var MetadataArgsStorage = /** @class */ (function () {
    function MetadataArgsStorage() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        /**
         * Registered controllers.
         */
        this.controllers = [];
        /**
         * Registered controller queries.
         */
        this.actions = [];
        /**
         * Resolver metadata args.
         */
        this.resolvers = [];
        /**
         * Resolve metadata args.
         */
        this.resolves = [];
        /**
         * Validator metadata args.
         */
        this.validators = [];
        /**
         * Authorized metadata args.
         */
        this.authorizes = [];
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Removes all saved metadata.
     */
    MetadataArgsStorage.prototype.reset = function () {
        this.controllers = [];
        this.actions = [];
        this.resolvers = [];
        this.resolves = [];
        this.validators = [];
        this.authorizes = [];
    };
    return MetadataArgsStorage;
}());
exports.MetadataArgsStorage = MetadataArgsStorage;

//# sourceMappingURL=MetadataArgsStorage.js.map
