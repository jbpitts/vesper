"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var MetadataArgsStorage_1 = require("./metadata-args/MetadataArgsStorage");
var VesperFramework_1 = require("./VesperFramework");
var SchemaBuilder_1 = require("./SchemaBuilder");
var typedi_1 = require("typedi");
var apollo_server_core_1 = require("apollo-server-core");
var CurrentRequest_1 = require("./token/CurrentRequest");
var CurrentResponse_1 = require("./token/CurrentResponse");
// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------
__export(require("./decorator/ArgsValidator"));
__export(require("./decorator/Authorized"));
__export(require("./decorator/Controller"));
__export(require("./decorator/Mutation"));
__export(require("./decorator/Query"));
__export(require("./decorator/Resolve"));
__export(require("./decorator/Resolver"));
__export(require("./decorator/Subscription"));
__export(require("./token/CurrentResponse"));
__export(require("./token/CurrentRequest"));
__export(require("./util/ResolverUtils"));
__export(require("./VesperFramework"));
// export * from "./ValidationError";
// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------
/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataArgsStorage() {
    if (!global.vesperMetadataArgsStorage)
        global.vesperMetadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
    return global.vesperMetadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
/**
 * Bootstraps framework the easiest way.
 */
function bootstrap(options) {
    var framework = new VesperFramework_1.VesperFramework(options);
    return framework.start().then(function () { return framework; });
}
exports.bootstrap = bootstrap;
/**
 * Builds GraphQLSchema based on provided options.
 */
function buildVesperSchema(options) {
    var middleware = new SchemaBuilder_1.SchemaBuilder(options);
    return middleware.build();
}
exports.buildVesperSchema = buildVesperSchema;
/**
 * Vesper Express middleware.
 * You can use it in your own express setup.
 */
function vesper(schema, options) {
    var allOptions = __assign({ context: {}, schema: schema }, (options || {}));
    return function (req, res, next) {
        var container = typedi_1.Container.of(req);
        container.set(CurrentRequest_1.CurrentRequest, req);
        container.set(CurrentResponse_1.CurrentResponse, res);
        allOptions.context.container = container;
        allOptions.context.dataLoaders = {};
        return apollo_server_core_1.runHttpQuery([req, res], {
            method: req.method,
            options: allOptions,
            query: req.method === "POST" ? req.body : req.query,
        }).then(function (gqlResponse) {
            // commit transaction
            var transactionEntityManager = container.has(typeorm_1.EntityManager) ? container.get(typeorm_1.EntityManager) : undefined;
            if (transactionEntityManager &&
                transactionEntityManager.connection.options.type !== "mongodb" &&
                transactionEntityManager.queryRunner &&
                transactionEntityManager.queryRunner.isTransactionActive &&
                transactionEntityManager.queryRunner.isReleased === false) {
                return transactionEntityManager.queryRunner
                    .commitTransaction()
                    .then(function () { return transactionEntityManager.queryRunner.release(); })
                    .then(function () { return gqlResponse; });
            }
            return gqlResponse;
        }).then(function (gqlResponse) {
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.setHeader("Content-Length", String(Buffer.byteLength(gqlResponse, "utf8")));
            res.write(gqlResponse);
            res.end();
            // request has finished - reset container
            typedi_1.Container.reset(req);
        }).catch(function (error) {
            // rollback transaction
            var transactionEntityManager = container.has(typeorm_1.EntityManager) ? container.get(typeorm_1.EntityManager) : undefined;
            if (transactionEntityManager &&
                transactionEntityManager.connection.options.type !== "mongodb" &&
                transactionEntityManager.queryRunner &&
                transactionEntityManager.queryRunner.isTransactionActive &&
                transactionEntityManager.queryRunner.isReleased === false) {
                return transactionEntityManager.queryRunner
                    .rollbackTransaction()
                    .then(function () { return transactionEntityManager.queryRunner.release(); })
                    .then(function () { throw error; });
            }
            throw error;
        }).catch(function (error) {
            if ("HttpQueryError" !== error.name)
                return next(error);
            if (error.headers) {
                Object.keys(error.headers).forEach(function (header) {
                    res.setHeader(header, error.headers[header]);
                });
            }
            res.statusCode = error.statusCode;
            res.write(error.message);
            res.end();
            // request has finished - reset container
            typedi_1.Container.reset(req);
        });
    };
}
exports.vesper = vesper;

//# sourceMappingURL=index.js.map
