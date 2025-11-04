import { compose } from "./aula4_function_composing_demo.ts";

type DivideTwo = (x: number) => number;
const divideTwo: DivideTwo = (x) => 2 / x;

console.log(divideTwo(8));
console.log(divideTwo(0));

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

const composed = compose(increment, divideTwo);
console.log(composed(8));
console.log(composed(0));

type Option<A> = Some<A> | None;

interface Some<A> {
    readonly _tag: "Some";
    readonly value: A;
}

interface None {
    readonly _tag: "None";
}

const some = <A>(a: A): Option<A> => ({
    _tag: "Some",
    value: a,
});

const none: Option<never> = {
    _tag: "None",
};

const isNone = <A>(x: Option<A>): x is None => x._tag === "None";
type DivideTwo2 = (x: number) => Option<number>;
const diviteTwo2: DivideTwo2 = (x) => x === 0 ? none : some(2 / x);

const composed2 = compose(
    (x) => isNone(x) ? none : some(increment(x.value)),
    diviteTwo2,
);

console.log(composed2(8))
console.log(composed2(0))

export {};
