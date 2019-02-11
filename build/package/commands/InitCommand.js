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
var path = require("path");
var CommandUtils_1 = require("./CommandUtils");
var chalk = require("chalk");
/**
 * Generates a new project with Vesper.
 */
var InitCommand = /** @class */ (function () {
    function InitCommand() {
        this.command = "init";
        this.describe = "Generates initial Vesper project structure. " +
            "If name specified then creates files inside directory called as name. " +
            "If its not specified then creates files inside current directory.";
    }
    InitCommand.prototype.builder = function (yargs) {
        return yargs
            .option("n", {
            alias: "name",
            describe: "Name of the project directory."
        })
            .option("javascript", {
            describe: "Creates a JavaScript project."
        })
            .option("typescript", {
            describe: "Creates a TypeScript project."
        })
            .option("db", {
            alias: "database",
            describe: "Database type you'll use in your project."
        });
    };
    InitCommand.prototype.handler = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var language, database, basePath, projectName, packageJsonContents, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 31, , 32]);
                        language = argv.typescript !== undefined ? "typescript" : "javascript";
                        database = argv.database || "sqlite";
                        basePath = process.cwd() + (argv.name ? ("/" + argv.name) : "");
                        projectName = argv.name ? path.basename(argv.name) : undefined;
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/package.json", InitCommand.getPackageJsonTemplate(projectName), false)];
                    case 1:
                        _a.sent();
                        if (!(database !== "sqlite")) return [3 /*break*/, 3];
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/docker-compose.yml", InitCommand.getDockerComposeTemplate(database), false)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/.gitignore", InitCommand.getGitIgnoreFile())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/README.md", InitCommand.getReadmeTemplate(database), false)];
                    case 5:
                        _a.sent();
                        if (!(language === "typescript")) return [3 /*break*/, 7];
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/tsconfig.json", InitCommand.getTsConfigTemplate())];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/ormconfig.json", InitCommand.getOrmConfigTemplate(database))];
                    case 8:
                        _a.sent();
                        if (!(language === "typescript")) return [3 /*break*/, 17];
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/controller/UserController.ts", InitCommand.getUserControllerTsTemplate())];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/controller/PhotoController.ts", InitCommand.getPhotoControllerTsTemplate())];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/args/UsersArgs.ts", InitCommand.getUsersArgsTemplate())];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/args/UserSaveArgs.ts", InitCommand.getUserSaveArgsTemplate(database))];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/args/PhotoSaveArgs.ts", InitCommand.getPhotoSaveArgsTemplate(database))];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/entity/User.ts", InitCommand.getUserEntityTsTemplate(database))];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/entity/Photo.ts", InitCommand.getPhotoEntityTsTemplate(database))];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/index.ts", InitCommand.getAppIndexTsTemplate())];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 17: return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/controller/UserController.js", InitCommand.getUserControllerJsTemplate())];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/controller/PhotoController.js", InitCommand.getPhotoControllerJsTemplate())];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/entity/User.js", InitCommand.getUserEntityJsTemplate(database))];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/entity/Photo.js", InitCommand.getPhotoEntityJsTemplate(database))];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/index.js", InitCommand.getAppIndexJsTemplate())];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/schema/model/User.graphql", InitCommand.getUserModelSchemaTemplate(database))];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/schema/model/Photo.graphql", InitCommand.getPhotoModelSchemaTemplate(database))];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/schema/controller/UserController.graphql", InitCommand.getUserControllerSchemaTemplate(database))];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/src/schema/controller/PhotoController.graphql", InitCommand.getPhotoControllerSchemaTemplate(database))];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createDirectories(basePath + "/src/migration")];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.readFile(basePath + "/package.json")];
                    case 29:
                        packageJsonContents = _a.sent();
                        return [4 /*yield*/, CommandUtils_1.CommandUtils.createFile(basePath + "/package.json", InitCommand.appendPackageJson(packageJsonContents, database, language))];
                    case 30:
                        _a.sent();
                        if (argv.name) {
                            console.log(chalk.green("Project created inside " + chalk.blue(basePath) + " directory."));
                        }
                        else {
                            console.log(chalk.green("Project created inside current directory."));
                        }
                        return [3 /*break*/, 32];
                    case 31:
                        err_1 = _a.sent();
                        console.log(chalk.black.bgRed("Error during project initialization:"));
                        console.error(err_1);
                        process.exit(1);
                        return [3 /*break*/, 32];
                    case 32: return [2 /*return*/];
                }
            });
        });
    };
    // -------------------------------------------------------------------------
    // Protected Static Methods
    // -------------------------------------------------------------------------
    /**
     * Gets contents of the ormconfig file.
     */
    InitCommand.getOrmConfigTemplate = function (database) {
        var options = {};
        switch (database) {
            case "mysql":
                Object.assign(options, {
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "test",
                    password: "test",
                    database: "test",
                });
                break;
            case "mariadb":
                Object.assign(options, {
                    type: "mariadb",
                    host: "localhost",
                    port: 3306,
                    username: "test",
                    password: "test",
                    database: "test",
                });
                break;
            case "sqlite":
                Object.assign(options, {
                    type: "sqlite",
                    "database": "database.sqlite",
                });
                break;
            case "postgres":
                Object.assign(options, {
                    "type": "postgres",
                    "host": "localhost",
                    "port": 5432,
                    "username": "test",
                    "password": "test",
                    "database": "test",
                });
                break;
            case "mssql":
                Object.assign(options, {
                    "type": "mssql",
                    "host": "localhost",
                    "username": "sa",
                    "password": "Admin12345",
                    "database": "tempdb",
                });
                break;
            case "oracle":
                Object.assign(options, {
                    "type": "oracle",
                    "host": "localhost",
                    "username": "system",
                    "password": "oracle",
                    "port": 1521,
                    "sid": "xe.oracle.docker",
                });
                break;
            case "mongodb":
                Object.assign(options, {
                    "type": "mongodb",
                    "database": "test",
                });
                break;
        }
        Object.assign(options, {
            synchronize: true,
            logging: false,
            entities: [
                "src/entity/**/*.ts"
            ],
            migrations: [
                "src/migration/**/*.ts"
            ],
            subscribers: [
                "src/subscriber/**/*.ts"
            ],
            cli: {
                entitiesDir: "src/entity",
                migrationsDir: "src/migration",
                subscribersDir: "src/subscriber"
            }
        });
        return JSON.stringify(options, undefined, 3);
    };
    /**
     * Gets contents of the ormconfig file.
     */
    InitCommand.getTsConfigTemplate = function () {
        return JSON.stringify({
            compilerOptions: {
                outDir: "./dist",
                lib: ["es5", "es6", "es7", "esnext"],
                target: "es5",
                module: "commonjs",
                moduleResolution: "node",
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                sourceMap: true
            }
        }, undefined, 3);
    };
    /**
     * Gets contents of the .gitignore file.
     */
    InitCommand.getGitIgnoreFile = function () {
        return ".idea/\n.vscode/\ndist/\nnode_modules/\ntmp/\ntemp/";
    };
    /**
     * Gets contents of the user entity.
     */
    InitCommand.getUserEntityTsTemplate = function (database) {
        return "import {Entity, " + (database === "mongodb" ? "ObjectIdColumn, ObjectID" : "PrimaryGeneratedColumn, OneToMany") + ", Column} from \"typeorm\";\nimport {Photo} from \"./Photo\";\n\n@Entity()\nexport class User {\n\n    " + (database === "mongodb" ? "@ObjectIdColumn()" : "@PrimaryGeneratedColumn()") + "\n    id: " + (database === "mongodb" ? "ObjectID" : "number") + ";\n\n    @Column()\n    firstName: string;\n\n    @Column()\n    lastName: string;\n" + (database !== "mongodb" ? "\n    @OneToMany(() => Photo, photo => photo.user)\n    photos: Photo[];" : "") + "\n\n}\n";
    };
    /**
     * Gets contents of the user entity.
     */
    InitCommand.getUserEntityJsTemplate = function (database) {
        return "import {EntitySchema} from \"typeorm\";\n\nexport const User = new EntitySchema({\n    name: \"User\",\n    columns: {\n        id: {\n            " + (database === "mongodb" ? "objectId: true," : "type: Number,") + "\n            primary: true,\n            generated: true\n        },\n        firstName: {\n            type: String\n        },\n        lastName: {\n            type: String\n        }\n    },\n    relations: {\n        photos: {\n            type: \"one-to-many\",\n            target: \"Photo\",\n            inverseSide: \"user\"\n        }\n    }\n});\n";
    };
    /**
     * Gets contents of the photo entity.
     */
    InitCommand.getPhotoEntityTsTemplate = function (database) {
        return "import {Entity, " + (database === "mongodb" ? "ObjectIdColumn, ObjectID" : "PrimaryGeneratedColumn, ManyToOne") + ", Column} from \"typeorm\";\nimport {User} from \"./User\";\n\n@Entity()\nexport class Photo {\n\n    " + (database === "mongodb" ? "@ObjectIdColumn()" : "@PrimaryGeneratedColumn()") + "\n    id: " + (database === "mongodb" ? "ObjectID" : "number") + ";\n\n    @Column()\n    filename: string;\n\n    @Column()\n    userId: " + (database === "mongodb" ? "string" : "number") + ";\n" + (database !== "mongodb" ? "\n    @ManyToOne(() => User, user => user.photos)\n    user: User;" : "") + "\n\n}\n";
    };
    /**
     * Gets contents of the photo entity.
     */
    InitCommand.getPhotoEntityJsTemplate = function (database) {
        return "import {EntitySchema} from \"typeorm\";\n\nexport const Photo = new EntitySchema({\n    name: \"Photo\",\n    columns: {\n        id: {\n            " + (database === "mongodb" ? "objectId: true," : "type: Number,") + "\n            primary: true,\n            generated: true\n        },\n        filename: {\n            type: String\n        },\n        userId: {\n            type: " + (database === "mongodb" ? "String" : "Number") + "\n        },\n    },\n    relations: {\n        user: {\n            type: \"many-to-one\",\n            target: \"User\",\n            inverseSide: \"photos\"\n        }\n    }\n});\n";
    };
    /**
     * Gets contents of the user controller file.
     */
    InitCommand.getUserControllerTsTemplate = function () {
        return "import {Controller, Mutation, Query} from \"vesper\";\nimport {EntityManager, FindManyOptions} from \"typeorm\";\nimport {UsersArgs} from \"../args/UsersArgs\";\nimport {UserSaveArgs} from \"../args/UserSaveArgs\";\nimport {User} from \"../entity/User\";\n\n@Controller()\nexport class UserController {\n\n    constructor(private entityManager: EntityManager) {\n    }\n\n    @Query()\n    users(args: UsersArgs): Promise<User[]> {\n\n        const findOptions: FindManyOptions = {};\n        if (args.limit)\n            findOptions.skip = args.limit;\n        if (args.offset)\n            findOptions.take = args.offset;\n\n        return this.entityManager.find(User, findOptions);\n    }\n\n    @Query()\n    user({ id }: { id: number }): Promise<User> {\n        return this.entityManager.findOne(User, id);\n    }\n\n    @Mutation()\n    async userSave(args: UserSaveArgs): Promise<User> {\n        const user = args.id ? await this.entityManager.findOne(User, args.id) : new User();\n        user.firstName = args.firstName;\n        user.lastName = args.lastName;\n        return this.entityManager.save(user);\n    }\n\n    @Mutation()\n    async userDelete({ id }: { id: number }): Promise<boolean> {\n        const user = await this.entityManager.findOne(User, id);\n        await this.entityManager.remove(user);\n        return true;\n    }\n\n}";
    };
    /**
     * Gets contents of the user controller file.
     */
    InitCommand.getUserControllerJsTemplate = function () {
        return "import {EntityManager} from \"typeorm\";\nimport {User} from \"../entity/User\";\n\nexport class UserController {\n\n    constructor(container) {\n        this.entityManager = container.get(EntityManager);\n    }\n\n    users(args) {\n\n        const findOptions = {};\n        if (args.limit)\n            findOptions.skip = args.limit;\n        if (args.offset)\n            findOptions.take = args.offset;\n\n        return this.entityManager.find(User, findOptions);\n    }\n\n    user({ id }) {\n        return this.entityManager.findOne(User, id);\n    }\n\n    async userSave(args) {\n        const user = args.id ? await this.entityManager.findOne(User, args.id) : {};\n        user.firstName = args.firstName;\n        user.lastName = args.lastName;\n        return this.entityManager.save(User, user);\n    }\n\n    async userDelete({ id }) {\n        await this.entityManager.remove(User, { id });\n        return true;\n    }\n\n}";
    };
    /**
     * Gets contents of the photo controller file.
     */
    InitCommand.getPhotoControllerTsTemplate = function () {
        return "import {Controller, Mutation, Query} from \"vesper\";\nimport {EntityManager} from \"typeorm\";\nimport {PhotoSaveArgs} from \"../args/PhotoSaveArgs\";\nimport {Photo} from \"../entity/Photo\";\n\n@Controller()\nexport class PhotoController {\n\n    constructor(private entityManager: EntityManager) {\n    }\n\n    @Query()\n    photos(): Promise<Photo[]> {\n        return this.entityManager.find(Photo);\n    }\n\n    @Query()\n    photo({ id }: { id: number }): Promise<Photo> {\n        return this.entityManager.findOne(Photo, id);\n    }\n\n    @Mutation()\n    async photoSave(args: PhotoSaveArgs): Promise<Photo> {\n        const photo = args.id ? await this.entityManager.findOne(Photo, args.id) : new Photo();\n        photo.filename = args.filename;\n        photo.userId = args.userId;\n        return this.entityManager.save(photo);\n    }\n\n    @Mutation()\n    async photoDelete({ id }: { id: number }): Promise<boolean> {\n        const photo = await this.entityManager.findOne(Photo, id);\n        await this.entityManager.remove(photo);\n        return true;\n    }\n\n}";
    };
    /**
     * Gets contents of the photo controller file.
     */
    InitCommand.getPhotoControllerJsTemplate = function () {
        return "import {EntityManager} from \"typeorm\";\nimport {Photo} from \"../entity/Photo\";\n\nexport class PhotoController {\n\n    constructor(container) {\n        this.entityManager = container.get(EntityManager);\n    }\n\n    photos() {\n        return this.entityManager.find(Photo);\n    }\n\n    photo({ id }) {\n        return this.entityManager.findOne(Photo, id);\n    }\n\n    async photoSave(args) {\n        const photo = args.id ? await this.entityManager.findOne(Photo, args.id) : {};\n        photo.filename = args.filename;\n        photo.userId = args.userId;\n        return this.entityManager.save(Photo, photo);\n    }\n\n    async photoDelete({ id }) {\n        await this.entityManager.remove(Photo, { id });\n        return true;\n    }\n\n}";
    };
    /**
     * Gets contents of the User graphql schema file.
     */
    InitCommand.getUserModelSchemaTemplate = function (database) {
        return "type User {\n    id: " + (database === "mongodb" ? "String" : "Int") + "\n    firstName: String\n    lastName: String\n    photos: [Photo]\n}";
    };
    /**
     * Gets contents of the Photo graphql schema file.
     */
    InitCommand.getPhotoModelSchemaTemplate = function (database) {
        return "type Photo {\n    id: " + (database === "mongodb" ? "String" : "Int") + "\n    filename: String\n    userId: " + (database === "mongodb" ? "String" : "Int") + "\n    user: User\n}";
    };
    /**
     * Gets contents of the User controller file.
     */
    InitCommand.getUserControllerSchemaTemplate = function (database) {
        return "type Query {\n    users(limit: Int, offset: Int): [User]\n    user(id: " + (database === "mongodb" ? "String" : "Int") + "): User\n}\n\ntype Mutation {\n    userSave(id: " + (database === "mongodb" ? "String" : "Int") + ", firstName: String, lastName: String): User\n    userDelete(id: " + (database === "mongodb" ? "String" : "Int") + "): Boolean\n}";
    };
    /**
     * Gets contents of the Photo controller file.
     */
    InitCommand.getPhotoControllerSchemaTemplate = function (database) {
        return "type Query {\n    photos: [Photo]\n    photo(id: " + (database === "mongodb" ? "String" : "Int") + "): Photo\n}\n\ntype Mutation {\n    photoSave(id: " + (database === "mongodb" ? "String" : "Int") + ", filename: String, userId: " + (database === "mongodb" ? "String" : "Int") + "): Photo\n    photoDelete(id: " + (database === "mongodb" ? "String" : "Int") + "): Boolean\n}";
    };
    /**
     * Gets contents of the UsersArgs file.
     */
    InitCommand.getUsersArgsTemplate = function () {
        return "export interface UsersArgs {\n\n    limit?: number;\n    offset?: number;\n\n}";
    };
    /**
     * Gets contents of the UserSaveArgs file.
     */
    InitCommand.getUserSaveArgsTemplate = function (database) {
        return "export interface UserSaveArgs {\n\n    id?: " + (database === "mongodb" ? "string" : "number") + ";\n    firstName: string;\n    lastName: string;\n\n}";
    };
    /**
     * Gets contents of the PhotoSaveArgs file.
     */
    InitCommand.getPhotoSaveArgsTemplate = function (database) {
        return "export interface PhotoSaveArgs {\n\n    id?: " + (database === "mongodb" ? "string" : "number") + ";\n    filename: string;\n    userId: " + (database === "mongodb" ? "string" : "number") + ";\n\n}";
    };
    /**
     * Gets contents of the main (index) application file.
     */
    InitCommand.getAppIndexTsTemplate = function () {
        return "import {bootstrap} from \"vesper\";\n\nbootstrap({\n    port: 3000,\n    cors: true,\n    controllers: [__dirname + \"/controller/**/*.ts\"],\n    resolvers: [__dirname + \"/resolver/**/*.ts\"],\n    schemas: [__dirname + \"/schema/**/*.graphql\"]\n}).then(() => {\n    console.log(\"Your app is up and running on http://localhost:3000. \" +\n        \"You can use playground in development mode on http://localhost:3000/playground\");\n}).catch(error => {\n    console.error(error.stack ? error.stack : error);\n});\n";
    };
    /**
     * Gets contents of the main (index) application file.
     */
    InitCommand.getAppIndexJsTemplate = function () {
        return "import \"babel-polyfill\";\nimport {bootstrap} from \"vesper\";\nimport {UserController} from \"./controller/UserController\";\nimport {PhotoController} from \"./controller/PhotoController\";\nimport {Photo} from \"./entity/Photo\";\nimport {User} from \"./entity/User\";\n\nbootstrap({\n    port: 3000,\n    cors: true,\n    controllers: [\n        { controller: UserController, action: \"users\", type: \"query\" },\n        { controller: UserController, action: \"user\", type: \"query\" },\n        { controller: UserController, action: \"userSave\", type: \"mutation\" },\n        { controller: UserController, action: \"userDelete\", type: \"mutation\" },\n        \n        { controller: PhotoController, action: \"photos\", type: \"query\" },\n        { controller: PhotoController, action: \"photo\", type: \"query\" },\n        { controller: PhotoController, action: \"photoSave\", type: \"mutation\" },\n        { controller: PhotoController, action: \"photoDelete\", type: \"mutation\" },\n    ],\n    resolvers: [\n    ],\n    entities: [\n        Photo,\n        User\n    ],\n    schemas: [__dirname + \"/schema/**/*.graphql\"]\n}).then(() => {\n    console.log(\"Your app is up and running on http://localhost:3000. \" +\n        \"You can use playground in development mode on http://localhost:3000/playground\");\n}).catch(error => {\n    console.error(error.stack ? error.stack : error);\n});\n";
    };
    /**
     * Gets contents of the new package.json file.
     */
    InitCommand.getPackageJsonTemplate = function (projectName) {
        return JSON.stringify({
            name: projectName || "vesper-project",
            version: "0.0.1",
            description: "Awesome project developed with Vesper framework.",
            devDependencies: {},
            dependencies: {},
            scripts: {}
        }, undefined, 3);
    };
    /**
     * Gets contents of the new docker-compose.yml file.
     */
    InitCommand.getDockerComposeTemplate = function (database) {
        switch (database) {
            case "mysql":
                return "version: '3'\nservices:\n\n  mysql:\n    image: \"mysql:5.7.10\"\n    ports:\n      - \"3306:3306\"\n    environment:\n      MYSQL_ROOT_PASSWORD: \"admin\"\n      MYSQL_USER: \"test\"\n      MYSQL_PASSWORD: \"test\"\n      MYSQL_DATABASE: \"test\"\n\n";
            case "mariadb":
                return "version: '3'\nservices:\n\n  mariadb:\n    image: \"mariadb:10.1.16\"\n    ports:\n      - \"3306:3306\"\n    environment:\n      MYSQL_ROOT_PASSWORD: \"admin\"\n      MYSQL_USER: \"test\"\n      MYSQL_PASSWORD: \"test\"\n      MYSQL_DATABASE: \"test\"\n\n";
            case "postgres":
                return "version: '3'\nservices:\n\n  postgres:\n    image: \"postgres:9.6.1\"\n    ports:\n      - \"5432:5432\"\n    environment:\n      POSTGRES_USER: \"test\"\n      POSTGRES_PASSWORD: \"test\"\n      POSTGRES_DB: \"test\"\n\n";
            case "sqlite":
                return "version: '3'\nservices:\n";
            case "oracle":
                throw new Error("You cannot initialize a project with docker for Oracle driver yet."); // todo: implement for oracle as well
            case "mssql":
                return "version: '3'\nservices:\n\n  mssql:\n    image: \"microsoft/mssql-server-linux:rc2\"\n    ports:\n      - \"1433:1433\"\n    environment:\n      SA_PASSWORD: \"Admin12345\"\n      ACCEPT_EULA: \"Y\"\n\n";
            case "mongodb":
                return "version: '3'\nservices:\n\n  mongodb:\n    image: \"mongo:3.4.1\"\n    container_name: \"typeorm-mongodb\"\n    ports:\n      - \"27017:27017\"\n\n";
        }
        return "";
    };
    /**
     * Gets contents of the new readme.md file.
     */
    InitCommand.getReadmeTemplate = function (database) {
        var template = "# Awesome Vesper Project\n        \nSteps to run this project:\n\n1. Run `npm i` command\n";
        if (database !== "sqlite") {
            template += "2. Run `docker-compose up` command\n";
        }
        else {
            template += "2. Setup database settings inside `ormconfig.json` file\n";
        }
        template += "3. Run `npm start` command\n        \nTo start testing things you can execute following queries:\n        \n```graphql\n# 1. First few users\nmutation UserSaveBulkMutation {\n  johny: userSave(firstName: \"Johny\", lastName: \"Cage\") {\n    id\n  }\n  linda: userSave(firstName: \"Linda\", lastName: \"Cage\") {\n    id\n  }\n}\n\n# 2. List users\nquery UserListQuery {\n  users {\n    id\n    firstName\n    lastName\n  }\n}\n\n# 3. Get user by id\nquery UserByIdQuery {\n  user(id: 1) { # insert user id here\n    id\n    firstName\n    lastName\n  }\n}\n" + (database !== "mongodb" ? "\n# 4. Save some photos\nmutation PhotoSaveBulkMutation {\n  johnyFirstPhoto: photoSave(filename: \"johny1.jpg\", userId: 1) {\n    id\n  }\n  johnySecondPhoto: photoSave(filename: \"johny2.jpg\", userId: 1) {\n    id\n  }\n  lindaFirstPhoto: photoSave(filename: \"linda1.jpg\", userId: 2) {\n    id\n  }\n  lindaSecondPhoto: photoSave(filename: \"linda2.jpg\", userId: 2) {\n    id\n  }\n}\n\n# 5. Get all photos and their authors\nquery PhotoListWithUserQuery {\n  photos {\n    id\n    filename\n    user {\n      id\n      firstName\n      lastName\n    }\n  }\n}\n\n# 6. Get all users and their photos\nquery UserListWithPhotosQuery {\n  users {\n    id\n    firstName\n    lastName\n    photos {\n      id\n      filename\n    }\n  }\n}" : "") + " \n```\n";
        return template;
    };
    /**
     * Appends to a given package.json template everything needed.
     */
    InitCommand.appendPackageJson = function (packageJsonContents, database, language) {
        var packageJson = JSON.parse(packageJsonContents);
        if (!packageJson.devDependencies)
            packageJson.devDependencies = {};
        if (language === "typescript") {
            Object.assign(packageJson.devDependencies, {
                "ts-node": "^5.0.1",
                // "@types/node": "^8.0.29",
                "typescript": "^2.7.2"
            });
        }
        else {
            Object.assign(packageJson.devDependencies, {
                "babel-cli": "^6.26.0",
                "babel-polyfill": "^6.26.0",
                "babel-preset-env": "^1.6.1"
            });
        }
        if (!packageJson.dependencies)
            packageJson.dependencies = {};
        Object.assign(packageJson.dependencies, {
            "vesper": require("../package.json").version
        });
        switch (database) {
            case "mysql":
            case "mariadb":
                packageJson.dependencies["mysql"] = "^2.14.1";
                break;
            case "postgres":
                packageJson.dependencies["pg"] = "^7.3.0";
                break;
            case "sqlite":
                packageJson.dependencies["sqlite3"] = "^3.1.10";
                break;
            case "oracle":
                packageJson.dependencies["oracledb"] = "^1.13.1";
                break;
            case "mssql":
                packageJson.dependencies["mssql"] = "^4.0.4";
                break;
            case "mongodb":
                packageJson.dependencies["mongodb"] = "^2.2.31";
                break;
        }
        if (!packageJson.scripts)
            packageJson.scripts = {};
        if (language === "typescript") {
            Object.assign(packageJson.scripts, {
                start: /*(docker ? "docker-compose up && " : "") + */ "ts-node src/index.ts"
            });
        }
        else {
            Object.assign(packageJson.scripts, {
                "compile": "npx babel src --out-dir dist --copy-files --source-maps --presets=babel-preset-env",
                "start": "npm run compile && node ./dist/index.js"
            });
        }
        return JSON.stringify(packageJson, undefined, 3);
    };
    return InitCommand;
}());
exports.InitCommand = InitCommand;

//# sourceMappingURL=InitCommand.js.map
