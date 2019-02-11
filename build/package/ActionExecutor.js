"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var typedi_1 = require("typedi");
/**
 * Executes action in multiple steps.
 * While we could do it in a single step using async/await syntax we decided to
 * make core complex code in favour of less ticks to improve performance.
 */
var ActionExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ActionExecutor(builder) {
        this.builder = builder;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Executes controller action.
     */
    ActionExecutor.prototype.executeControllerAction = function (action) {
        return this.step1(action);
    };
    /**
     * Executes resolver action.
     */
    ActionExecutor.prototype.executeResolver = function (action) {
        return this.step3(action);
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * First step - check if action must run in a transaction.
     */
    ActionExecutor.prototype.step1 = function (action) {
        var _this = this;
        // create a new scoped container for this request
        if (this.builder.connection) {
            if (action.metadata.transaction &&
                this.builder.connection.options.type !== "mongodb") {
                var containerEntityManager = action.context.container.get(typeorm_1.EntityManager);
                var queryRunner_1;
                if (containerEntityManager &&
                    containerEntityManager.queryRunner &&
                    containerEntityManager.queryRunner.isReleased === false) {
                    queryRunner_1 = containerEntityManager.queryRunner;
                }
                else {
                    queryRunner_1 = this.builder.connection.createQueryRunner();
                }
                if (queryRunner_1.isTransactionActive === false) {
                    return queryRunner_1.startTransaction().then(function () {
                        return _this.step2(action, queryRunner_1.manager);
                    });
                }
            }
            else {
                return this.step2(action, this.builder.connection.manager);
            }
        }
        return this.step2(action);
    };
    /**
     * Second step - setup container.
     */
    ActionExecutor.prototype.step2 = function (action, entityManager) {
        var _this = this;
        // in the case if someone inject container itself
        action.context.container.set(typedi_1.Container, action.context.container);
        // if entity manager was given the register it in the container
        if (entityManager) {
            action.context.container.set(typeorm_1.EntityManager, entityManager);
            typeorm_1.getMetadataArgsStorage().entityRepositories.forEach(function (repository) {
                action.context.container.set(repository.target, entityManager.getCustomRepository(repository.target));
            });
        }
        // if setup-container callback was set then execute it before controller method execution
        if (this.builder.options.setupContainer) {
            var setupContainerResult = this.builder.options.setupContainer(action.container, action);
            if (setupContainerResult instanceof Promise)
                return setupContainerResult.then(function () { return _this.step3(action); });
        }
        return this.step3(action);
    };
    /**
     * Third step - check authorization.
     */
    ActionExecutor.prototype.step3 = function (action) {
        var _this = this;
        var promiseResults = [];
        action.metadata.authorizes.forEach(function (authorize) {
            var authorizationCheckResult;
            if (authorize instanceof Array) {
                authorizationCheckResult = _this.builder.options.authorizationChecker(authorize, action);
            }
            else {
                authorizationCheckResult = action.container.get(authorize).check(action);
            }
            if (authorizationCheckResult instanceof Promise)
                promiseResults.push(authorizationCheckResult);
        });
        if (promiseResults.length > 0)
            return Promise.all(promiseResults).then(function (result) { return _this.step4(action); });
        return this.step4(action);
    };
    /**
     * Forth step - validate action args.
     */
    ActionExecutor.prototype.step4 = function (action) {
        var _this = this;
        var promiseResults = [];
        action.metadata.validators.forEach(function (validator) {
            var validationResult = action.container.get(validator).validate(action.args);
            if (validationResult instanceof Promise)
                promiseResults.push(validationResult);
        });
        if (promiseResults.length > 0)
            return Promise.all(promiseResults).then(function (result) { return _this.step5(action); });
        return this.step5(action);
    };
    /**
     * Fifth step - execute controller / resolver method.
     */
    ActionExecutor.prototype.step5 = function (action) {
        if (action.metadata.type === "query" || action.metadata.type === "mutation") {
            return action.container.get(action.metadata.target)[action.metadata.methodName](action.args, action.context, action.info);
        }
        else {
            // for subscriptions and resolver methods we send obj
            return action.container.get(action.metadata.target)[action.metadata.methodName](action.obj, action.args, action.context, action.info);
        }
    };
    return ActionExecutor;
}());
exports.ActionExecutor = ActionExecutor;

//# sourceMappingURL=ActionExecutor.js.map
