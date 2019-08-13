import { Decimal } from "decimal.js";
import * as _ from "lodash";

export class ArrayUtils {
    public static permutate<T>(collection: T[], size?: number): T[][] {
        const left = collection.length - (size || collection.length);
        const result: any = []; const usedChars: any = [];
        const permutateInternal = (input: any) => {

            let index; let chars;
            for (index = 0; index < input.length; index++) {
                chars = input.splice(index, 1)[0];
                usedChars.push(chars);

                if (input.length === left) {
                    result.push(usedChars.slice());
                }

                permutateInternal(input);

                input.splice(index, 0, chars);
                usedChars.pop();
            }
            return result;
        };

        return permutateInternal(collection);
    }

    public static at<T extends { name: string, value: string }>(collection: T[], key: string): Decimal {
        return new Decimal(_.first(collection.filter(($) => $.name === key)).value);
    }
}
