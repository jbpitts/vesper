/**
 * Registers a controller method as a GraphQL mutation.
 */
export declare function Mutation(options?: {
    name?: string;
    transaction?: boolean;
}): (object: Object, methodName: string) => void;
