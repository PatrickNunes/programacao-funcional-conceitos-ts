import { HKT2, HKT3, Kind2, Kind3, URIS2, URIS3 } from "fp-ts/HKT";
import {
  Either,
  isLeft,
  isRight,
  Left,
  left,
  match,
  Right,
  right,
} from "./lib/either.ts";

interface Bifunctor<F> {
  URI: F;
  bimap: <A, B, C, D>(
    f: (a: A) => C,
    g: (b: B) => D,
  ) => (fab: HKT2<F, A, B>) => HKT2<F, C, D>;
}

interface Bifunctor2<F extends URIS2> {
  URI: F;
  bimap: <A, B, C, D>(
    f: (a: A) => C,
    g: (b: B) => D,
  ) => (fab: Kind2<F, A, B>) => Kind2<F, C, D>;
}

const eitherBifunctor: Bifunctor2<"Either"> = {
  URI: "Either",
  bimap: (f, g) =>
    match(
      (a) => left(f(a)),
      (b) => right(g(b)),
    ),
};

type IsEmail = (x: string) => boolean;
const isEmail: IsEmail = (x) => x.includes("@");

type ToString = (x: number) => string;
const toString: ToString = (x) => `number ${x}`;

const lift1 = eitherBifunctor.bimap(isEmail, toString);

console.log(lift1(left("bob@email.com")));
console.log(lift1(right(12)));

type Id = <A>(x: A) => A;
const id: Id = (x) => x;

const map = eitherBifunctor.bimap(id, toString);

console.log(map(left("bob@email.com")));
console.log(map(right(12)));

const mapLeft = eitherBifunctor.bimap(isEmail, id);

console.log(mapLeft(left("bob@email.com")));
console.log(mapLeft(right(12)));

const lift4 = eitherBifunctor.bimap(id, id);

console.log(lift4(left("bob@email.com")));
console.log(lift4(right(12)));