/**
 * Can be used to throw validation error which logger skips when it output errors.
 * Useful, if you don't want user validation errors to show up in your console.
 */
export declare class ValidationError extends Error {
    name: string;
    constructor(message: string);
}
