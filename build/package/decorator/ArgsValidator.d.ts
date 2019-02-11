import { ArgsValidatorInterface } from "../interface/ArgsValidatorInterface";
/**
 * Uses given validator to validate query / mutation args.
 */
export declare function ArgsValidator(validator: {
    new (): ArgsValidatorInterface<any>;
}): Function;
