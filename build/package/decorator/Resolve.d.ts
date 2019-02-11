/**
 * Used in resolvers to mark method as resolving some data.
 */
export declare function Resolve(options?: {
    name?: string;
}): (object: Object, propertyName: string) => void;
