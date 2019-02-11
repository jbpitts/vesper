"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typedi_1 = require("typedi");
var index_1 = require("./index");
var typeorm_1 = require("typeorm");
var graphql_1 = require("graphql");
var graphql_tools_1 = require("graphql-tools");
var ActionMetadataBuilder_1 = require("./metadata/ActionMetadataBuilder");
var ResolveMetadataBuilder_1 = require("./metadata/ResolveMetadataBuilder");
var ActionExecutor_1 = require("./ActionExecutor");
var CurrentRequest_1 = require("./token/CurrentRequest");
var CurrentResponse_1 = require("./token/CurrentResponse");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var DataLoader = require("dataloader");
var GraphQLUpload = require("apollo-upload-server").GraphQLUpload;
var _a = require("merge-graphql-schemas"), mergeTypes = _a.mergeTypes, fileLoader = _a.fileLoader;
var debug = require("debug");
/**
 * Builds graphql schema needed for graphql server.
 */
var SchemaBuilder = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SchemaBuilder(options) {
        /**
         * Loggers used to log debug messages.
         */
        this.loggers = {
            query: debug("graphql:controller:query"),
            mutation: debug("graphql:controller:mutation"),
            resolver: debug("graphql:resolver")
        };
        this.options = options;
        this.modules = this.buildModules();
        this.actionMetadatas = new ActionMetadataBuilder_1.ActionMetadataBuilder(this.options, index_1.getMetadataArgsStorage()).build(this.modules);
        this.resolveMetadatas = new ResolveMetadataBuilder_1.ResolveMetadataBuilder(this.options, index_1.getMetadataArgsStorage()).build(this.modules);
        this.actionExecutor = new ActionExecutor_1.ActionExecutor(this);
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Creates ORM connection and builds grahpql schema.
     */
    SchemaBuilder.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, schemaTypes, resolvers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // create database connection
                        _a = this;
                        return [4 /*yield*/, this.createORMConnection()];
                    case 1:
                        // create database connection
                        _a.connection = _b.sent();
                        schemaTypes = this.loadSchemaTypes();
                        resolvers = {};
                        this.createDefaultResolvers(resolvers);
                        this.buildControllerResolvers(resolvers);
                        this.buildModelResolversFromEntityMetadata(resolvers);
                        this.buildCustomResolvers(resolvers);
                        if (this.options.customResolvers)
                            Object.assign(resolvers, this.options.customResolvers);
                        return [2 /*return*/, graphql_tools_1.makeExecutableSchema({
                                typeDefs: "scalar Date \r\n scalar Upload \r\n" + mergeTypes(schemaTypes) + "\r\n" + (this.options.customTypeDefs || ""),
                                resolvers: resolvers,
                                resolverValidationOptions: {
                                    allowResolversNotInSchema: true
                                },
                                logger: {
                                    log: function (error) {
                                        // todo: need to finish implementation
                                        // console.log((error as ValidationError).name);
                                        // console.log((error as ValidationError).toString());
                                        // console.log(error instanceof ValidationError);
                                        // skip user-made validation errors
                                        // if ((error as ValidationError).name === "ValidationError")
                                        //     return;
                                        if (_this.options.logger)
                                            return _this.options.logger(error);
                                        console.log(error.stack ? error.stack : error);
                                    }
                                }
                            })];
                }
            });
        });
    };
    SchemaBuilder.prototype.buildOnlySchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schemaTypes;
            return __generator(this, function (_a) {
                schemaTypes = this.loadSchemaTypes();
                return [2 /*return*/, graphql_tools_1.makeExecutableSchema({
                        typeDefs: "scalar Date \r\n scalar Upload \r\n" + mergeTypes(schemaTypes) + "\r\n" + (this.options.customTypeDefs || ""),
                    })];
            });
        });
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Builds all modules used in the app.
     */
    SchemaBuilder.prototype.buildModules = function () {
        var modules = [this.options];
        if (this.options.modules) {
            this.options.modules.forEach(function (module) {
                if (module instanceof Function) {
                    modules.push(typedi_1.Container.get(module));
                }
                else {
                    modules.push(module);
                }
            });
        }
        return modules;
    };
    /**
     * Creates database connection if ormconfig was found.
     */
    SchemaBuilder.prototype.createORMConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readerOptions, name, hasConnection, options_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.typeorm.connection) {
                            return [2 /*return*/, this.options.typeorm.connection];
                        }
                        readerOptions = this.options.typeorm && this.options.typeorm.connectionOptionsReaderOptions || {};
                        name = this.options.typeorm && this.options.typeorm.connectionName || "default";
                        return [4 /*yield*/, new typeorm_1.ConnectionOptionsReader(readerOptions).has(name)];
                    case 1:
                        hasConnection = _a.sent();
                        if (!hasConnection) return [3 /*break*/, 3];
                        return [4 /*yield*/, new typeorm_1.ConnectionOptionsReader(readerOptions).get(name)];
                    case 2:
                        options_1 = _a.sent();
                        if (!options_1.entities)
                            Object.assign(options_1, { entities: [] });
                        if (!options_1.subscribers)
                            Object.assign(options_1, { subscribers: [] });
                        this.modules.forEach(function (module) {
                            if (module.entities)
                                module.entities.forEach(function (entity) { return options_1.entities.push(entity); });
                            if (module.entitySubscribers)
                                module.entitySubscribers.forEach(function (entity) { return options_1.subscribers.push(entity); });
                            if (module.entityRepositories) {
                                module.entityRepositories.forEach(function (repository) {
                                    typeorm_1.getMetadataArgsStorage().entityRepositories.push({
                                        target: repository.repository,
                                        entity: repository.entity,
                                    });
                                });
                            }
                            // todo: what about migrations ?
                        });
                        return [2 /*return*/, typeorm_1.getConnectionManager().create(options_1).connect()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads all schemas from all schema directories.
     */
    SchemaBuilder.prototype.loadSchemaTypes = function () {
        // collect all schemas from all modules
        var schemas = this.modules.reduce(function (schemas, module) {
            if (module.schemas)
                schemas.push.apply(schemas, module.schemas);
            return schemas;
        }, []);
        // if schemas are not defined in the configuration then throw an error
        if (!schemas.length)
            throw new Error("You must provide \"schemas\" in the configuration options where from GraphQL schemas must be loaded and used.");
        // load all schemas
        return schemas.reduce(function (types, schemaDir) {
            types.push.apply(types, fileLoader(schemaDir));
            return types;
        }, []);
    };
    /**
     * Default resolvers provided by the framework.
     */
    SchemaBuilder.prototype.createDefaultResolvers = function (resolvers) {
        Object.assign(resolvers, {
            Date: new graphql_1.GraphQLScalarType({
                name: "Date",
                description: "Date custom scalar type",
                parseValue: function (value) {
                    return new Date(value); // value from the client
                },
                serialize: function (value) {
                    return value.getTime(); // value sent to the client
                },
                parseLiteral: function (ast) {
                    if (ast.kind === graphql_1.Kind.INT) {
                        return parseInt(ast.value, 10); // ast value is always in string format
                    }
                    return null;
                },
            }),
            Upload: GraphQLUpload
        });
    };
    /**
     * Builds resolvers from the graph controllers.
     */
    SchemaBuilder.prototype.buildControllerResolvers = function (resolvers) {
        var _this = this;
        this.actionMetadatas.forEach(function (action) {
            var resolverType = _this.getResolverType(action.type);
            if (!resolvers[resolverType])
                resolvers[resolverType] = {};
            if (resolverType === "Subscription") {
                if (!_this.options.subscriptionAsyncIterator)
                    throw new Error("\"subscriptionAsyncIterator\" must be defined in the framework options in order to use subscriptions.");
                var that_1 = _this;
                resolvers[resolverType][action.name || action.methodName] = {
                    subscribe: graphql_subscriptions_1.withFilter(function () { return _this.options.subscriptionAsyncIterator(action.name || action.methodName); }, function (playload, args, context, info) {
                        var container = typedi_1.Container.of(this);
                        context.container = container;
                        var executionResult = that_1.actionExecutor.executeControllerAction({
                            metadata: action,
                            request: undefined,
                            response: undefined,
                            container: container,
                            obj: playload,
                            args: args,
                            context: context,
                            info: info
                        });
                        if (executionResult instanceof Promise) {
                            return executionResult.then(function (result) {
                                if (result === undefined)
                                    return true;
                                return result;
                            });
                        }
                        else {
                            if (executionResult === undefined)
                                return true;
                            return executionResult;
                        }
                    })
                };
            }
            else {
                resolvers[resolverType][action.name] = function (parent, args, context, info) {
                    _this.loggers[action.type]("controller action \"" + action.name + "\"");
                    return _this.actionExecutor.executeControllerAction({
                        metadata: action,
                        request: context.container.get(CurrentRequest_1.CurrentRequest),
                        response: context.container.get(CurrentResponse_1.CurrentResponse),
                        container: context.container,
                        obj: parent,
                        args: args,
                        context: context,
                        info: info
                    });
                };
            }
        });
    };
    /**
     * Builds model resolvers from entity metadatas.
     * Used to automatically return entity relations.
     */
    SchemaBuilder.prototype.buildModelResolversFromEntityMetadata = function (resolvers) {
        var _this = this;
        if (!this.connection)
            return;
        this.connection.entityMetadatas.forEach(function (entityMetadata) {
            var resolverName = _this.options.entityResolverNamingStrategy && entityMetadata.target instanceof Function
                ? _this.options.entityResolverNamingStrategy(entityMetadata.target)
                : entityMetadata.targetName;
            if (!resolverName)
                return;
            if (!resolvers[resolverName])
                resolvers[resolverName] = {};
            entityMetadata.relations.forEach(function (relation) {
                // make sure not to override method if it was defined by user
                resolvers[resolverName][relation.propertyName] = function (parent, args, context, info) {
                    _this.loggers.resolver("entity relation \"" + resolverName + "." + relation.propertyName + "\"");
                    // make sure not to override method if it was defined by user
                    if (parent[relation.propertyName] !== undefined)
                        return parent[relation.propertyName];
                    if (!context.dataLoaders[resolverName])
                        context.dataLoaders[resolverName] = {};
                    // define data loader for this method if it was not defined yet
                    if (!context.dataLoaders[resolverName][relation.propertyName]) {
                        context.dataLoaders[resolverName][relation.propertyName] = new DataLoader(function (keys) {
                            var entities = keys.map(function (key) { return key.parent; });
                            return _this.connection
                                .relationIdLoader
                                .loadManyToManyRelationIdsAndGroup(relation, entities)
                                .then(function (groups) { return groups.map(function (group) { return group.related; }); });
                        }, {
                            cacheKeyFn: function (key) {
                                var parent = key.parent, args = key.args;
                                var entityIds = entityMetadata.getEntityIdMap(parent);
                                return JSON.stringify({ entity: entityIds, args: args });
                            }
                        });
                    }
                    return context.dataLoaders[resolverName][relation.propertyName].load({ parent: parent, args: args, context: context, info: info });
                };
            });
        });
    };
    /**
     * Builds resolvers from the resolve metadatas.
     */
    SchemaBuilder.prototype.buildCustomResolvers = function (resolvers) {
        var _this = this;
        // register custom defined resolvers
        this.resolveMetadatas.forEach(function (resolve) {
            if (!resolvers[resolve.name])
                resolvers[resolve.name] = {};
            if (resolve.target.prototype[resolve.methodName] === undefined)
                return;
            resolvers[resolve.name][resolve.methodName] = function (parent, args, context, info) {
                _this.loggers.resolver("model property \"" + resolve.name + "." + resolve.methodName + "\"");
                if (resolve.dataLoader) {
                    if (!context.dataLoaders[resolve.name] || !context.dataLoaders[resolve.name][resolve.methodName]) {
                        if (!context.dataLoaders[resolve.name])
                            context.dataLoaders[resolve.name] = {};
                        context.dataLoaders[resolve.name][resolve.methodName] = new DataLoader(function (keys) {
                            var entities = keys.map(function (key) { return key.parent; });
                            var result = _this.actionExecutor.executeResolver({
                                metadata: resolve,
                                request: context.container.get(CurrentRequest_1.CurrentRequest),
                                response: context.container.get(CurrentResponse_1.CurrentResponse),
                                container: context.container,
                                obj: entities,
                                args: keys[0].args,
                                context: keys[0].context,
                                info: keys[0].info
                            });
                            if (!(result instanceof Promise))
                                return Promise.resolve(result);
                            return result;
                        }, {
                            cacheKeyFn: function (key) {
                                return JSON.stringify({ parent: key.parent, args: key.args });
                            }
                        });
                    }
                    return context.dataLoaders[resolve.name][resolve.methodName].load({ parent: parent, args: args, context: context, info: info });
                }
                else {
                    return _this.actionExecutor.executeResolver({
                        metadata: resolve,
                        request: context.container.get(CurrentRequest_1.CurrentRequest),
                        response: context.container.get(CurrentResponse_1.CurrentResponse),
                        container: context.container,
                        obj: parent,
                        args: args,
                        context: context,
                        info: info
                    });
                }
            };
        });
    };
    /**
     * Gets resolver type from the given action type.
     */
    SchemaBuilder.prototype.getResolverType = function (actionType) {
        if (actionType === "query") {
            return "Query";
        }
        else if (actionType === "mutation") {
            return "Mutation";
        }
        else if (actionType === "subscription") {
            return "Subscription";
        }
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;

//# sourceMappingURL=SchemaBuilder.js.map
