#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var InitCommand_1 = require("./commands/InitCommand");
var GenerateModelsCommand_1 = require("./commands/GenerateModelsCommand");
require("yargs")
    .usage("Usage: $0 <command> [options]")
    .command(new InitCommand_1.InitCommand())
    .command(new GenerateModelsCommand_1.GenerateModelsCommand())
    .demandCommand(1)
    .strict()
    .alias("v", "version")
    .help("h")
    .alias("h", "help")
    .argv;
require("yargonaut")
    .style("blue")
    .style("yellow", "required")
    .helpStyle("green")
    .errorsStyle("red");

//# sourceMappingURL=cli.js.map
