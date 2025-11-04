import { cons, List, nil } from "./aula14_linked_list.ts";
import { match } from "./aula16_ADT_pattern_maching_demo.ts";

type AddAll = (xs: List<number>) => number;
const addAll: AddAll = match(
    () => 0,
    (head: number, tail: List<number>) => head + addAll(tail),
);

// console.log(addAll(cons(2, cons(3, cons(4, nil)))));

type MultiplyAll = (xs: List<number>) => number;
const multiplyAll: MultiplyAll = match(
    () => 1,
    (head: number, tail: List<number>) => head * multiplyAll(tail),
);

// console.log(multiplyAll(cons(2, cons(3, cons(4, nil)))));

type AppendAll = (xs: List<string>) => string;
const appendAll: AppendAll = match(
    () => "",
    (head: string, tail: List<string>) => head + appendAll(tail),
);

// console.log(appendAll(cons("a", cons("b", cons("c", nil)))));

interface Magma<A> {
    concat: (x: A, y: A) => A;
}

interface Semigroup<A> extends Magma<A> {
}

const addSemiGroup: Semigroup<number> = {
    concat: (x, y) => x + y,
};

const multiplySemiGroup: Semigroup<number> = {
    concat: (x, y) => x * y,
};

const appendSemiGroup: Semigroup<string> = {
    concat: (x, y) => x.concat(y),
};

const concatAll = <A>(s: Semigroup<A>) => (startWith: A) => (xs: List<A>): A =>
    match(
        () => startWith,
        (head: A, tail: List<A>) =>
            s.concat(head, concatAll(s)(startWith)(tail)),
    )(xs);

// console.log(concatAll(addSemiGroup)(0)(cons(2, cons(3, cons(4, nil)))));
// console.log(concatAll(multiplySemiGroup)(1)(cons(2, cons(3, cons(4, nil)))));
// console.log(
//     concatAll(appendSemiGroup)("")(cons("a", cons("b", cons("c", nil)))),
// );

interface Monoid<A> extends Semigroup<A> {
    empty: A;
}

const addMonoid: Monoid<number> = {
    ...addSemiGroup,
    empty: 0,
};

const multiplyMonoid: Monoid<number> = {
    ...multiplySemiGroup,
    empty: 1,
};

const appendMonoid: Monoid<string> = {
    ...appendSemiGroup,
    empty: "",
};

const concatAll2 = <A>(m: Monoid<A>) => (xs: List<A>): A =>
    match(
        () => m.empty,
        (head: A, tail: List<A>) => m.concat(head, concatAll2(m)(tail)),
    )(xs);

// console.log(concatAll2(addMonoid)(cons(2, cons(3, cons(4, nil)))));
// console.log(concatAll2(multiplyMonoid)(cons(2, cons(3, cons(4, nil)))));
// console.log(
//     concatAll2(appendMonoid)(cons("a", cons("b", cons("c", nil)))),
// );

export {
    Magma,
    Semigroup,
    Monoid
}