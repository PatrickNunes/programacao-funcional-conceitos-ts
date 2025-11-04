import { compose } from "./aula4_function_composing_demo.ts";

function diviteTwoIfEven(num: number): number {
    if (num === 0) {
        throw "cannot divite by zero";
    } else if (num % 2 !== 0) {
        throw "num is not even";
    } else {
        return 2 / num;
    }
}
//console.log(diviteTwoIfEven(8));
//console.log(diviteTwoIfEven(0));
//console.log(diviteTwoIfEven(3));

type Either<E, A> = Left<E> | Right<A>;

interface Left<E> {
    _tag: "Left";
    left: E;
}

interface Right<A> {
    _tag: "Right";
    right: A;
}

const left = <E, A = never>(e: E): Either<E, A> => ({
    _tag: "Left",
    left: e,
});

const right = <A, E = never>(a: A): Either<E, A> => ({
    _tag: "Right",
    right: a,
});

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left";

function diviteTwoIfEven2(num: number): Either<string, number> {
    if (num === 0) {
        return left("cannot divite by zero");
    } else if (num % 2 !== 0) {
        return left("num is not even");
    } else {
        return right(2 / num);
    }
}

//console.log(diviteTwoIfEven2(8));
//console.log(diviteTwoIfEven2(0));
//console.log(diviteTwoIfEven2(3));

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

const composed = compose(
    (x) => isLeft(x) ? x : right(increment(x.right)),
    diviteTwoIfEven2,
);

//console.log(composed(8));
//console.log(composed(0));
//console.log(composed(3));

type Match = <E, A, B>(
    onLeft: (e: E) => B,
    onRight: (a: A) => B,
) => (x: Either<E, A>) => B;

const match: Match = (onLeft, onRight) => (x) =>
    isLeft(x) ? onLeft(x.left) : onRight(x.right);

export {
    Either,
    Left,
    Right,
    left,
    right,
    isLeft,
    match
}