import { Monoid } from "./aula19_magma_semigroup_monoid_demo.ts";

interface Group<A> extends Monoid<A> {
    inverse: (x: A) => A;
}

const addGroup: Group<number> = {
    concat: (x, y) => x + y,
    empty: 0,
    inverse: (a) => -a,
};

const walletBallance = addGroup.concat(
    addGroup.empty,
    addGroup.concat(80, addGroup.concat(20, addGroup.inverse(10))),
);

console.log(walletBallance);

type Encrypt = (plainText: string, key: number) => string;
type Decrypt = (cipherText: string, key: number) => string;

const alphabets = "abcdefghijklmnopqrstuvwxyz";

const ceaserGroup: Group<number> = {
    concat: (x, y) => (x + y) % alphabets.length,
    empty: 0,
    inverse: (a) => (alphabets.length - a) % alphabets.length,
};

const encrypt: Encrypt = (plainText, key) =>
    plainText.toLowerCase().split("").map((c) => {
        const index = alphabets.indexOf(c);
        if (index === -1) {
            return c;
        }
        const newIndex = ceaserGroup.concat(index, key);
        return alphabets[newIndex];
    }).join("");

const decrypt: Decrypt = (cipherText, key) =>
    encrypt(cipherText, ceaserGroup.inverse(key));

console.log(decrypt(encrypt("hello world!", 7),7));
