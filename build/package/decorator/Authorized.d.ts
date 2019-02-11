import { RoleCheckerInterface } from "../index";
/**
 * Marks query / mutation to have a special access.
 * It usually means it requires user authorization or some specific user role.
 * Authorization logic must be defined in the framework settings.
 */
export declare function Authorized(roles?: {
    new (): RoleCheckerInterface;
} | any[]): Function;
