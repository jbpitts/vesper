/**
 * Registers a controller method as a GraphQL query.
 */
export declare function Query(options?: {
    name?: string;
    transaction?: boolean;
}): (object: Object, methodName: string) => void;
