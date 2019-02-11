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
var index_1 = require("../index");
var cli_1 = require("graphql-code-generator/dist/cli");
var prettier_1 = require("graphql-code-generator/dist/utils/prettier");
var fs = require("fs");
var chalk = require("chalk");
/**
 * Generates models for the given graphql schemas.
 */
var GenerateModelsCommand = /** @class */ (function () {
    function GenerateModelsCommand() {
        this.command = "generate:models";
        this.describe = "Generates models for the given graphql schemas.";
    }
    GenerateModelsCommand.prototype.builder = function (yargs) {
        return yargs
            .option("schemas", {
            alias: "s",
            describe: "GraphQL schemas to be loaded.",
            required: true
        })
            .option("port", {
            alias: "p",
            describe: "Port which should be used for express server.",
            required: true
        })
            .option("out", {
            alias: "o",
            describe: "Path for generation output file/directory. When using single-file generator specify filename, and when using multiple-files generator specify a directory.",
            required: true
        });
    };
    GenerateModelsCommand.prototype.handler = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                index_1.bootstrap({
                    port: argv.port,
                    schemas: [process.cwd() + "/" + argv.schemas]
                }).then(function (framework) {
                    console.log("Schemas are loaded and application was bootstrapped.");
                    return cli_1.executeWithOptions({
                        template: "typescript",
                        url: "http://127.0.0.1:" + argv.port + "/graphql",
                        out: process.cwd() + "/" + argv.out,
                        schema: true
                    })
                        .then(function (generationResult) {
                        // console.log(`Generation result contains total of ${generationResult.length} files...`);
                        return Promise.all(generationResult.map(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var content, _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        content = result.content.trim();
                                        if (content.length === 0) {
                                            console.log("Generated file skipped (empty): " + result.filename);
                                            return [2 /*return*/];
                                        }
                                        _b = (_a = fs).writeFileSync;
                                        _c = [result.filename];
                                        return [4 /*yield*/, prettier_1.prettify(result.filename, result.content)];
                                    case 1:
                                        _b.apply(_a, _c.concat([_d.sent()]));
                                        console.log("Generated file written to " + result.filename);
                                        return [2 /*return*/];
                                }
                            });
                        }); })).then(function () { return framework.stop(); });
                    }).catch(function (error) {
                        console.error(error);
                        return framework.stop();
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return GenerateModelsCommand;
}());
exports.GenerateModelsCommand = GenerateModelsCommand;

//# sourceMappingURL=GenerateModelsCommand.js.map
