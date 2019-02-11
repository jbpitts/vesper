import "reflect-metadata";
import { Connection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { ActionMetadata } from "./metadata/ActionMetadata";
import { ResolveMetadata } from "./metadata/ResolveMetadata";
import { GraphModule } from "./options/GraphModule";
import { ActionExecutor } from "./ActionExecutor";
import { SchemaBuilderOptions } from "./options/SchemaBuilderOptions";
/**
 * Builds graphql schema needed for graphql server.
 */
export declare class SchemaBuilder {
    /**
     * Framework options.
     */
    options: SchemaBuilderOptions;
    /**
     * Framework options.
     */
    connection?: Connection;
    /**
     * Graph modules.
     */
    protected modules: GraphModule[];
    /**
     * All built actions.
     */
    protected actionMetadatas: ActionMetadata[];
    /**
     * All resolve actions.
     */
    protected resolveMetadatas: ResolveMetadata[];
    /**
     * Used to execute controller actions.
     */
    protected actionExecutor: ActionExecutor;
    /**
     * Loggers used to log debug messages.
     */
    protected loggers: {
        query: (str: string) => any;
        mutation: (str: string) => any;
        resolver: (str: string) => any;
    };
    constructor(options: SchemaBuilderOptions);
    /**
     * Creates ORM connection and builds grahpql schema.
     */
    build(): Promise<GraphQLSchema>;
    buildOnlySchema(): Promise<GraphQLSchema>;
    /**
     * Builds all modules used in the app.
     */
    protected buildModules(): GraphModule[];
    /**
     * Creates database connection if ormconfig was found.
     */
    protected createORMConnection(): Promise<Connection | undefined>;
    /**
     * Loads all schemas from all schema directories.
     */
    protected loadSchemaTypes(): string[];
    /**
     * Default resolvers provided by the framework.
     */
    protected createDefaultResolvers(resolvers: any): void;
    /**
     * Builds resolvers from the graph controllers.
     */
    protected buildControllerResolvers(resolvers: any): void;
    /**
     * Builds model resolvers from entity metadatas.
     * Used to automatically return entity relations.
     */
    protected buildModelResolversFromEntityMetadata(resolvers: any): void;
    /**
     * Builds resolvers from the resolve metadatas.
     */
    protected buildCustomResolvers(resolvers: any): void;
    /**
     * Gets resolver type from the given action type.
     */
    protected getResolverType(actionType: string): string;
}
