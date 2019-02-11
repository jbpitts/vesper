"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionMetadata_1 = require("./ActionMetadata");
var Utils_1 = require("../util/Utils");
/**
 * Builds action metadatas.
 */
var ActionMetadataBuilder = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ActionMetadataBuilder(options, metadataArgsStorage) {
        this.options = options;
        this.metadataArgsStorage = metadataArgsStorage;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Builds action metadatas based on the given stack options and metadata args storage.
     */
    ActionMetadataBuilder.prototype.build = function (modules) {
        var _this = this;
        var actions = [];
        // first load controllers
        // thus we are filling metadata args storage
        modules.forEach(function (module) {
            if (!module.controllers)
                return;
            var controllerDirs = module.controllers.filter(function (controller) { return typeof controller === "string"; });
            Utils_1.Utils.importClassesFromDirectories(controllerDirs);
        });
        // now we have all metadata args registered in the storage, first read all controllers from the storage
        this.metadataArgsStorage.controllers.forEach(function (controller) {
            _this.metadataArgsStorage.actions.forEach(function (action) {
                if (action.target !== controller.target)
                    return;
                var validators = _this.metadataArgsStorage.validators.filter(function (validator) { return validator.target === action.target && validator.methodName === action.methodName; });
                var authorizes = _this.metadataArgsStorage.authorizes.filter(function (authorize) { return authorize.target === action.target && authorize.methodName === action.methodName; });
                actions.push(_this.createFromMetadataArgs(action, validators, authorizes));
            });
        });
        // now register all actions passed in the array of modules
        modules.forEach(function (module) {
            if (module.controllers) {
                module.controllers.forEach(function (controller) {
                    if (typeof controller === "object") {
                        actions.push(_this.createFromModuleDefinition(controller.type, controller));
                    }
                });
            }
        });
        return actions;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates ActionMetadata from the given ActionMetadataArgs object.
     */
    ActionMetadataBuilder.prototype.createFromMetadataArgs = function (action, validators, authorizes) {
        var metadata = new ActionMetadata_1.ActionMetadata();
        metadata.type = action.type;
        metadata.target = action.target;
        metadata.methodName = action.methodName;
        metadata.name = action.name || action.methodName;
        metadata.transaction = action.transaction === true ? true : false;
        metadata.validators = validators.map(function (validator) { return validator.validator; });
        metadata.authorizes = authorizes.map(function (authorize) { return authorize.roles; });
        return metadata;
    };
    /**
     * Creates ActionMetadata from the given GraphModuleControllerAction object.
     */
    ActionMetadataBuilder.prototype.createFromModuleDefinition = function (type, action) {
        var metadata = new ActionMetadata_1.ActionMetadata();
        metadata.type = type;
        metadata.target = action.controller;
        metadata.methodName = action.action;
        metadata.name = action.name || action.action;
        metadata.transaction = action.transaction === true ? true : false;
        metadata.validators = action.validators || [];
        metadata.authorizes = action.authorizes || [];
        return metadata;
    };
    return ActionMetadataBuilder;
}());
exports.ActionMetadataBuilder = ActionMetadataBuilder;

//# sourceMappingURL=ActionMetadataBuilder.js.map
