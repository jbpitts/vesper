/**
 * Registers a controller method as a GraphQL subscription.
 */
export declare function Subscription(options?: {
    name?: string;
    transaction?: boolean;
}): (object: Object, methodName: string) => void;
