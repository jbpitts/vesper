"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../util/Utils");
var ResolveMetadata_1 = require("./ResolveMetadata");
var typeorm_1 = require("typeorm");
/**
 * Builds resolve metadatas.
 */
var ResolveMetadataBuilder = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ResolveMetadataBuilder(options, metadataArgsStorage) {
        this.options = options;
        this.metadataArgsStorage = metadataArgsStorage;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Builds resolve metadatas based on the given stack options and metadata args storage.
     */
    ResolveMetadataBuilder.prototype.build = function (modules) {
        var _this = this;
        var resolves = [];
        // first load controllers
        // thus we are filling metadata args storage
        modules.forEach(function (module) {
            if (!module.resolvers)
                return;
            var resolverDirs = module.resolvers.filter(function (resolver) { return typeof resolver === "string"; });
            Utils_1.Utils.importClassesFromDirectories(resolverDirs);
        });
        // now we have all metadata args registered in the storage, first read all resolvers from the storage
        this.metadataArgsStorage.resolvers.forEach(function (resolver) {
            _this.metadataArgsStorage.resolves.forEach(function (resolve) {
                if (resolve.target !== resolver.target)
                    return;
                var validators = _this.metadataArgsStorage.validators.filter(function (validator) { return validator.target === resolve.target && validator.methodName === resolve.methodName; });
                var authorizes = _this.metadataArgsStorage.authorizes.filter(function (authorize) { return authorize.target === resolve.target && authorize.methodName === resolve.methodName; });
                resolves.push(_this.createFromMetadataArgs(resolver, resolve, validators, authorizes));
            });
        });
        // now register all resolves passed in the array of modules
        modules.forEach(function (module) {
            if (module.resolvers) {
                module.resolvers.forEach(function (resolver) {
                    if (typeof resolver === "object") {
                        resolver.methods.forEach(function (method) {
                            resolves.push(_this.createFromModuleResolver(resolver, method));
                        });
                    }
                });
            }
        });
        return resolves;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates ResolveMetadata from the given resolver and resolve metadata args objects.
     */
    ResolveMetadataBuilder.prototype.createFromMetadataArgs = function (resolver, resolve, validators, authorizes) {
        var metadata = new ResolveMetadata_1.ResolveMetadata();
        metadata.target = resolver.target;
        if (resolver.name instanceof Function) {
            metadata.name = this.options.entityResolverNamingStrategy ? this.options.entityResolverNamingStrategy(resolver.name) : resolver.name.name;
            metadata.entity = resolver.name;
        }
        else {
            metadata.name = resolver.name;
        }
        metadata.methodName = resolve.methodName;
        metadata.resolvingPropertyName = resolve.name || resolve.methodName;
        metadata.dataLoader = resolve.dataLoader === true ? true : false;
        metadata.validators = validators.map(function (validator) { return validator.validator; });
        metadata.authorizes = authorizes.map(function (authorize) { return authorize.roles; });
        return metadata;
    };
    /**
     * Creates ResolveMetadata from the given GraphModule resolver and method objects.
     */
    ResolveMetadataBuilder.prototype.createFromModuleResolver = function (resolver, method) {
        var metadata = new ResolveMetadata_1.ResolveMetadata();
        metadata.target = resolver.resolver;
        if (resolver.model instanceof Function) {
            metadata.name = this.options.entityResolverNamingStrategy ? this.options.entityResolverNamingStrategy(resolver.model) : resolver.model.name;
            metadata.entity = resolver.model;
        }
        else if (resolver.model instanceof typeorm_1.EntitySchema) {
            metadata.name = resolver.model.options.name;
            metadata.entity = resolver.model;
        }
        else {
            metadata.name = resolver.model;
        }
        if (typeof method === "string") {
            metadata.methodName = method;
            metadata.resolvingPropertyName = method;
            metadata.dataLoader = false;
            metadata.validators = [];
            metadata.authorizes = [];
        }
        else {
            metadata.methodName = method.methodName;
            metadata.resolvingPropertyName = method.name || method.methodName;
            metadata.dataLoader = method.many === true ? true : false;
            metadata.validators = method.validators || [];
            metadata.authorizes = method.authorizes || [];
        }
        return metadata;
    };
    return ResolveMetadataBuilder;
}());
exports.ResolveMetadataBuilder = ResolveMetadataBuilder;

//# sourceMappingURL=ResolveMetadataBuilder.js.map
