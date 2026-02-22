import { Functor1 } from "./functor.ts";

export type List<A> = Nil | Cons<A>;

export interface Nil {
  _tag: "Nil";
}

export interface Cons<A> {
  _tag: "Cons";
  head: A;
  tail: List<A>;
}

export const nil: List<never> = { _tag: "Nil" };
export const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: "Cons",
  head: head,
  tail: tail,
});

export const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === "Nil";

export type ShowList = <A>(xs: List<A>) => string;
export const showList: ShowList = (xs) =>
  isNil(xs)
    ? ""
    : `${xs.head}` + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);

export type Match = <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: List<A>) => B,
) => (xs: List<A>) => B;
export const match: Match = (onNil, onCons) => (xs) =>
  isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

export const functor: Functor1<"List"> = {
  URI: "List",
  map: (f) =>
    match(
      () => nil,
      (head, tail) => cons(f(head), functor.map(f)(tail)),
    ),
};
