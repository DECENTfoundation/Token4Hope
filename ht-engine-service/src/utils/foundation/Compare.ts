import { ComparisonResult } from "./ComparisonResult";

export const Compare = (left: number, right: number): ComparisonResult => {

    switch (true) {
        case left > right: return ComparisonResult.Asceding;
        case left < right: return ComparisonResult.Descending;
        case left === right: return ComparisonResult.Same;
        default:
            throw new Error(`Values comaprison ${left} and ${right} failed`);
    }
};
