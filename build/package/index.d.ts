/// <reference types="express" />
import "reflect-metadata";
import { MetadataArgsStorage } from "./metadata-args/MetadataArgsStorage";
import { VesperFramework } from "./VesperFramework";
import { VesperFrameworkOptions } from "./options/VesperFrameworkOptions";
import { NextFunction, Request, Response } from "express";
import { SchemaBuilderOptions } from "./options/SchemaBuilderOptions";
import { GraphQLSchema } from "graphql";
declare global  {
    interface RequestInit {
    }
}
export * from "./decorator/ArgsValidator";
export * from "./decorator/Authorized";
export * from "./decorator/Controller";
export * from "./decorator/Mutation";
export * from "./decorator/Query";
export * from "./decorator/Resolve";
export * from "./decorator/Resolver";
export * from "./decorator/Subscription";
export * from "./interface/Action";
export * from "./interface/ArgsValidatorInterface";
export * from "./interface/ResolverInterface";
export * from "./interface/RoleCheckerInterface";
export * from "./options/GraphModule";
export * from "./options/GraphModuleControllerAction";
export * from "./options/GraphModuleResolver";
export * from "./options/GraphModuleResolverMethod";
export * from "./options/VesperFrameworkOptions";
export * from "./options/SchemaBuilderOptions";
export * from "./token/CurrentResponse";
export * from "./token/CurrentRequest";
export * from "./util/ResolverUtils";
export * from "./VesperFramework";
/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export declare function getMetadataArgsStorage(): MetadataArgsStorage;
/**
 * Bootstraps framework the easiest way.
 */
export declare function bootstrap(options?: VesperFrameworkOptions): Promise<VesperFramework>;
/**
 * Builds GraphQLSchema based on provided options.
 */
export declare function buildVesperSchema(options?: SchemaBuilderOptions): Promise<GraphQLSchema>;
/**
 * Vesper Express middleware.
 * You can use it in your own express setup.
 */
export declare function vesper(schema: any, options?: object): (req: Request, res: Response, next: NextFunction) => Promise<void>;
