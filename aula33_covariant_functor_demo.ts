import { HKT, Kind, Kind2, URIS, URIS2 } from "fp-ts/HKT";
import { compose } from "./lib/compose.ts";

interface Contravariant<F> {
  URI: F;
  contramap: <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>;
}

interface Contravariant1<F extends URIS> {
  URI: F;
  contramap: <A, B>(f: (b: B) => A) => (f: Kind<F, A>) => Kind<F, B>;
}

interface Contravariant2<F extends URIS2> {
  URI: F;
  contramap: <E, A, B>(f: (b: B) => A) => (f: Kind2<F, E, A>) => Kind2<F, E, B>;
}

type Predicate<A> = (a: A) => boolean;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    "Predicate": Predicate<A>;
  }
}

const preticateContravariant: Contravariant1<"Predicate"> = {
  URI: "Predicate",
  contramap: (f) => (predicateA) => compose(predicateA, f),
};

type IsNumberEven = Predicate<number>;
const isNumberEven: IsNumberEven = (x) => x % 2 === 0;

type Length = (str: string) => number;
const length: Length = (str) => str.length;

type LiftedLength = (x: Predicate<number>) => Predicate<string>;
const liftedLength: LiftedLength = preticateContravariant.contramap(length);

type IsStringEven = Predicate<string>;
const isStringEven: IsStringEven = liftedLength(isNumberEven);

console.log(isStringEven('book'));
console.log(isStringEven('book1'));