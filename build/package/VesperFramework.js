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
var express = require("express");
var apollo_server_express_1 = require("apollo-server-express");
var bodyParser = require("body-parser");
var cors = require("cors");
var index_1 = require("./index");
var typedi_1 = require("typedi");
var fs = require("fs");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var graphql_1 = require("graphql");
var graphql_playground_middleware_express_1 = require("graphql-playground-middleware-express");
var apolloUploadExpress = require("apollo-upload-server").apolloUploadExpress;
/**
 * Bootstraps Vesper framework.
 * Registers controllers and middlewares, creates http server and database connection.
 */
var VesperFramework = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function VesperFramework(options) {
        // -------------------------------------------------------------------------
        // Public Properties
        // -------------------------------------------------------------------------
        /**
         * Application's root path.
         */
        this.root = require("app-root-path").path;
        this.options = options;
        this.application = options.expressApp || express();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Starts express application and http server.
     * If port is not given then port from the framework options will be used.
     */
    VesperFramework.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var parameters, graphQLRoute, schema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // throw error if port was not set
                        if (!this.options.port)
                            throw new Error("Cannot start server because port is not set. Please set port in the framework options.");
                        parameters = this.buildParameters();
                        if (parameters) {
                            Object.keys(parameters).forEach(function (key) {
                                typedi_1.Container.set(key, parameters[key]);
                            });
                        }
                        // use all middlewares user specified in options
                        if (this.options.use)
                            this.options.use.forEach(function (use) { return _this.application.use(use); });
                        // register CORS if it was enabled
                        if (this.options.cors)
                            this.application.use(this.options.cors === true ? cors() : cors(this.options.cors));
                        graphQLRoute = this.options.graphQLRoute || "/graphql";
                        return [4 /*yield*/, index_1.buildVesperSchema(this.options)];
                    case 1:
                        schema = _a.sent();
                        this.application.use(graphQLRoute, bodyParser.json(), apolloUploadExpress(), index_1.vesper(schema));
                        // start server on a given port
                        return [2 /*return*/, new Promise(function (ok, fail) {
                                _this.server = _this.application.listen(_this.options.port, function (err) {
                                    if (err)
                                        return fail(err);
                                    // register the WebSocket for handling GraphQL subscriptions
                                    var hasSubscriptions = index_1.getMetadataArgsStorage().actions.filter(function (action) { return action.type === "subscription"; });
                                    if (hasSubscriptions) {
                                        new subscriptions_transport_ws_1.SubscriptionServer({ execute: graphql_1.execute, subscribe: graphql_1.subscribe, schema: schema }, { server: _this.server, path: "/subscriptions" });
                                    }
                                    // register GraphIQL
                                    if (_this.options.graphIQLRoute === true || typeof _this.options.graphIQLRoute === "string") {
                                        var graphIQLRoute = (_this.options.graphIQLRoute && typeof _this.options.graphIQLRoute === "string") ? _this.options.graphIQLRoute : "/graphiql";
                                        var graphIOptions = { endpointURL: graphQLRoute };
                                        if (hasSubscriptions)
                                            graphIOptions.subscriptionsEndpoint = "ws://localhost:" + _this.options.port + "/subscriptions";
                                        _this.application.use(graphIQLRoute, apollo_server_express_1.graphiqlExpress(graphIOptions));
                                    }
                                    // register playground
                                    if (_this.options.playground === true ||
                                        typeof _this.options.graphIQLRoute === "string" ||
                                        (_this.options.playground === undefined && process.env.NODE_ENV !== "prod")) {
                                        var playgroundRoute = (_this.options.playground && typeof _this.options.playground === "string") ? _this.options.playground : "/playground";
                                        var graphIOptions = { endpoint: graphQLRoute };
                                        if (hasSubscriptions)
                                            graphIOptions.subscriptionsEndpoint = "ws://localhost:" + _this.options.port + "/subscriptions";
                                        _this.application.use(playgroundRoute, graphql_playground_middleware_express_1.default(graphIOptions));
                                    }
                                    ok();
                                });
                            })];
                }
            });
        });
    };
    /**
     * Stops express application and http server.
     */
    VesperFramework.prototype.stop = function () {
        var _this = this;
        if (!this.server)
            return Promise.resolve();
        return new Promise(function (ok, fail) {
            _this.server.close(function (err) { return err ? fail(err) : ok(); });
        });
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Builds configuration parameters to be injected into the container.
     */
    VesperFramework.prototype.buildParameters = function () {
        var _this = this;
        var parameters;
        if (typeof this.options.parameters === "object") {
            parameters = this.options.parameters;
        }
        else if (typeof this.options.parameters === "string") {
            parameters = require(this.root + "/" + this.options.parameters);
        }
        else if (this.options.parameters instanceof Array) {
            this.options.parameters.reduce(function (parameters, fileName) {
                return Object.assign(parameters, require(_this.root + "/" + fileName));
            }, {});
        }
        else {
            if (fs.existsSync(this.root + "/config.json")) {
                parameters = require(this.root + "/config.json");
            }
        }
        return parameters;
    };
    return VesperFramework;
}());
exports.VesperFramework = VesperFramework;

//# sourceMappingURL=VesperFramework.js.map
