import { ECKeyPair, Passphrase } from "dcorejs-sdk";
import * as Uuid from "uuid";
import { KeyCredentails } from "../../plugins/keystore/KeyCredentials";

export class KeyGenerator {

    public static generate(passphrase?: string): KeyCredentails {
        const phrase = passphrase || Passphrase.generate();
        const keypair = ECKeyPair.generateFromPhrase(phrase);

        return {
            brainKey: phrase.toString(),
            privateKey: keypair.privateWif.encoded,
            publicKey: keypair.publicAddress.encoded,
        } as KeyCredentails;
    }

    public static getFamilyChainName(): string {
        return `t4h-card-${Uuid.v4()}`;
    }
}
