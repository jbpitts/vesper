import { GraphModule } from "../options/GraphModule";
import { MetadataArgsStorage } from "../metadata-args/MetadataArgsStorage";
import { ResolveMetadata } from "./ResolveMetadata";
import { ResolveMetadataArgs } from "../metadata-args/ResolveMetadataArgs";
import { GraphModuleResolverMethod } from "../options/GraphModuleResolverMethod";
import { ResolverMetadataArgs } from "../metadata-args/ResolverMetadataArgs";
import { GraphModuleResolver } from "../options/GraphModuleResolver";
import { SchemaBuilderOptions } from "../options/SchemaBuilderOptions";
import { AuthorizedMetadataArgs } from "../metadata-args/AuthorizedMetadataArgs";
import { ArgsValidatorMetadataArgs } from "../metadata-args/ArgsValidatorMetadataArgs";
/**
 * Builds resolve metadatas.
 */
export declare class ResolveMetadataBuilder {
    protected options: SchemaBuilderOptions;
    protected metadataArgsStorage: MetadataArgsStorage;
    constructor(options: SchemaBuilderOptions, metadataArgsStorage: MetadataArgsStorage);
    /**
     * Builds resolve metadatas based on the given stack options and metadata args storage.
     */
    build(modules: GraphModule[]): ResolveMetadata[];
    /**
     * Creates ResolveMetadata from the given resolver and resolve metadata args objects.
     */
    protected createFromMetadataArgs(resolver: ResolverMetadataArgs, resolve: ResolveMetadataArgs, validators: ArgsValidatorMetadataArgs[], authorizes: AuthorizedMetadataArgs[]): ResolveMetadata;
    /**
     * Creates ResolveMetadata from the given GraphModule resolver and method objects.
     */
    protected createFromModuleResolver(resolver: GraphModuleResolver, method: GraphModuleResolverMethod | string): ResolveMetadata;
}
