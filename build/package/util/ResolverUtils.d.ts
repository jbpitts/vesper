/**
 * Utilities to work with resolving data.
 */
export declare class ResolverUtils {
    /**
     * Groups given entities by a given ids.
     */
    static groupByMany<T>(originalIds: (string | number)[], entities: T[], property: keyof T | ((entity: T) => any)): T[][];
}
