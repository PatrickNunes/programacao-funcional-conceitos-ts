import { Either, isLeft, left, right } from "./aula12_either_demo.ts";
import { cons, isNil, List, nil } from "./aula14_linked_list.ts";
import { isNone, none, Option, some } from "./aula9_option_maybe_null.ts";

//Option
// type MatchW = <A, B, C>(
//     onNone: () => B,
//     onSome: (a: A) => C,
// ) => (x: Option<A>) => B | C;

// const matchW: MatchW = (onNone, onSome) => (x) =>
//     isNone(x) ? onNone() : onSome(x.value);

// const maybeNum: Option<number> = none;
// const result = matchW(
//     () => -2,
//     (a: number) => `num is ${a}`,
// )(maybeNum);

//Eihter
// type Match = <E, A, B>(
//     onLeft: (e: E) => B,
//     onRight: (a: A) => B,
// ) => (x: Either<E, A>) => B;

// const match: Match = (onLeft, onRight) => (x) =>
//     isLeft(x) ? onLeft(x.left) : onRight(x.right);

// const errorOrNum: Either<string, number> = left('bad input');
// const result = match(
//     (e: string) => `Error happend: ${e}`,
//     (a: number) => `num is ${a}`,
// )(errorOrNum);

//List
type Match = <A, B>(
    onNil: () => B,
    onCons: (head: A, tail: List<A>) => B,
) => (xs: List<A>) => B;
const match: Match = (onNil, onCons) => (xs) =>
    isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

const myList: List<number> = cons(1, cons(2, cons(3, nil)));

const result = match(
    () => `list is empty`,
    (head: number, tail: List<number>) => `head is ${head}`,
)(myList);

//console.log(result);

export {
    match
}
