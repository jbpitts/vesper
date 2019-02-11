import { ControllerMetadataArgs } from "./ControllerMetadataArgs";
import { ResolverMetadataArgs } from "./ResolverMetadataArgs";
import { ResolveMetadataArgs } from "./ResolveMetadataArgs";
import { ActionMetadataArgs } from "./ActionMetadataArgs";
import { ArgsValidatorMetadataArgs } from "./ArgsValidatorMetadataArgs";
import { AuthorizedMetadataArgs } from "./AuthorizedMetadataArgs";
/**
 * Storage all metadatas read from decorators.
 */
export declare class MetadataArgsStorage {
    /**
     * Registered controllers.
     */
    controllers: ControllerMetadataArgs[];
    /**
     * Registered controller queries.
     */
    actions: ActionMetadataArgs[];
    /**
     * Resolver metadata args.
     */
    resolvers: ResolverMetadataArgs[];
    /**
     * Resolve metadata args.
     */
    resolves: ResolveMetadataArgs[];
    /**
     * Validator metadata args.
     */
    validators: ArgsValidatorMetadataArgs[];
    /**
     * Authorized metadata args.
     */
    authorizes: AuthorizedMetadataArgs[];
    /**
     * Removes all saved metadata.
     */
    reset(): void;
}
