import { HKT, Kind, Kind2, URIS, URIS2 } from "fp-ts/HKT";
import { Option } from "./option.ts";
import { List } from "./list.ts";
import { Either } from "./either.ts";

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    List: List<A>;
    Option: Option<A>;
  }
  interface URItoKind2<E, A> {
    Either: Either<E, A>;
  }
}

export interface Functor<F> {
  URI: F;
  map: <A, B>(f: (x: A) => B) => (fa: HKT<F, A>) => HKT<F, B>;
}

export interface Functor1<F extends URIS> {
  URI: F;
  map: <A, B>(f: (x: A) => B) => (fa: Kind<F, A>) => Kind<F, B>;
}
export interface Functor2<F extends URIS2> {
  URI: F;
  map: <E, A, B>(f: (x: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>;
}

export function lift<F extends URIS2>(
  F: Functor2<F>,
): <E, A, B>(f: (x: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>;
export function lift<F extends URIS>(
  F: Functor1<F>,
): <A, B>(f: (x: A) => B) => (fa: Kind<F, A>) => Kind<F, B>;
export function lift<F>(
  F: Functor<F>,
): <A, B>(f: (x: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return (f) => (fa) => F.map(f)(fa);
}
