import * as BCrypt from "bcrypt";
import * as Crypto from "crypto";
import * as Fs from "fs";
import * as _ from "lodash";
import * as Uuid from "uuid";

import { SessionPoolPolicy } from "../../plugins/session";
import { ArrayUtils } from "../../utils/foundation";

export class CryptoUtils {

    public static permutate(passphrases: string[]): string[] {
        return ArrayUtils.permutate(passphrases, 2).map(($) => $.join(""));
    }

    public static hashImmediate(plain: string, rounds: number = 5): string {
        return BCrypt.hashSync(plain, rounds);
    }

    public static async hash(plain: string, rounds: number = 5): Promise<string> {
        return await BCrypt.hash(plain, rounds);
    }

    public static compareHashImmediate(plain: string, encrypted: string): boolean {
        return BCrypt.compareSync(plain, encrypted);
    }

    public static async compareHash(plain: string, encrypted: string): Promise<boolean> {
        return await BCrypt.compare(plain, encrypted);
    }

    public static encrypt(plain: string, passphrase: string): string {
        const key = Crypto.createHash("md5").update(passphrase).digest(); // TODO: MD5 -> SHA256
        const iv = Crypto.pseudoRandomBytes(16);
        const cipher = Crypto.createCipheriv("aes-128-cbc", key, Buffer.from(iv));

        return (
            iv.toString("hex") +
            cipher.update(plain, "utf8", "hex") +
            cipher.final("hex")
        );
    }

    public static decrypt(encrypted: string, passphrase: string): string {
        const key = Crypto.createHash("md5").update(passphrase).digest();
        const iv = encrypted.slice(0, 32);
        const data = encrypted.slice(32);
        const decipher = Crypto.createDecipheriv("aes-128-cbc", key, Buffer.from(iv, "hex"));

        return (
            decipher.update(data, "hex", "utf8") +
            decipher.final("utf8")
        );
    }
    public static token(): string {
        return Uuid.v4();
    }

    public static numericHashToken(value: string, size: number = 6): [string, string] {
        const token = this.numericToken(size);
        return [
            Crypto.createHash("md5").update(`${value}${token}`).digest("hex"),
            token,
        ];
    }

    public static numericToken(size: number = 6): string {
        const scheme = "0123456789";
        let result = "";
        for (let i = 0; i < size; i++) {
            result += scheme.charAt(Math.floor(Math.random() * scheme.length));
        }

        return result;
    }

    public static sign(value: any, path: string): string;
    public static sign(value: any, secret: any): string {
        let key = secret;
        if (_.includes(key, ".pem")) {
            key = this.pem(key);
        }
        return Crypto.createSign("RSA-SHA1")
            .update(JSON.stringify(value))
            .sign(key, "base64");
    }

    // Normalize base 64
    public static normalize(value: string): string {
        return value
            .replace(/\+/g, "-")
            .replace(/=/g, "_")
            .replace(/\//g, "~");
    }

    public static pem(path: string): string {

        const file = Fs.readFileSync(path);
        const key = file.toString("ascii");
        const pattern = /\r|\n/;

        if (!pattern.test(key)) {
            throw new Error("Invalid private key string, must include line breaks");
        }
        return key;
    }
}
