import "reflect-metadata";
import { EntityManager } from "typeorm";
import { Action } from "./interface/Action";
import { SchemaBuilder } from "./SchemaBuilder";
/**
 * Executes action in multiple steps.
 * While we could do it in a single step using async/await syntax we decided to
 * make core complex code in favour of less ticks to improve performance.
 */
export declare class ActionExecutor {
    protected builder: SchemaBuilder;
    constructor(builder: SchemaBuilder);
    /**
     * Executes controller action.
     */
    executeControllerAction(action: Action): any;
    /**
     * Executes resolver action.
     */
    executeResolver(action: Action): any;
    /**
     * First step - check if action must run in a transaction.
     */
    protected step1(action: Action): any;
    /**
     * Second step - setup container.
     */
    protected step2(action: Action, entityManager?: EntityManager): any;
    /**
     * Third step - check authorization.
     */
    protected step3(action: Action): any;
    /**
     * Forth step - validate action args.
     */
    protected step4(action: Action): any;
    /**
     * Fifth step - execute controller / resolver method.
     */
    protected step5(action: Action): any;
}
