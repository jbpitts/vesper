import { GraphModule } from "../options/GraphModule";
import { ActionMetadata } from "./ActionMetadata";
import { MetadataArgsStorage } from "../metadata-args/MetadataArgsStorage";
import { AuthorizedMetadataArgs } from "../metadata-args/AuthorizedMetadataArgs";
import { GraphModuleControllerAction } from "../options/GraphModuleControllerAction";
import { ArgsValidatorMetadataArgs } from "../metadata-args/ArgsValidatorMetadataArgs";
import { SchemaBuilderOptions } from "../options/SchemaBuilderOptions";
import { ActionMetadataArgs } from "../metadata-args/ActionMetadataArgs";
/**
 * Builds action metadatas.
 */
export declare class ActionMetadataBuilder {
    protected options: SchemaBuilderOptions;
    protected metadataArgsStorage: MetadataArgsStorage;
    constructor(options: SchemaBuilderOptions, metadataArgsStorage: MetadataArgsStorage);
    /**
     * Builds action metadatas based on the given stack options and metadata args storage.
     */
    build(modules: GraphModule[]): ActionMetadata[];
    /**
     * Creates ActionMetadata from the given ActionMetadataArgs object.
     */
    protected createFromMetadataArgs(action: ActionMetadataArgs, validators: ArgsValidatorMetadataArgs[], authorizes: AuthorizedMetadataArgs[]): ActionMetadata;
    /**
     * Creates ActionMetadata from the given GraphModuleControllerAction object.
     */
    protected createFromModuleDefinition(type: "query" | "mutation" | "subscription", action: GraphModuleControllerAction<any>): ActionMetadata;
}
