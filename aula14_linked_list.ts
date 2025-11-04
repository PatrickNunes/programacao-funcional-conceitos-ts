type List<A> = Nil | Cons<A>;

interface Nil {
    _tag: "Nil";
}

interface Cons<A> {
    _tag: "Cons";
    head: A;
    tail: List<A>;
}

const nil: List<never> = { _tag: "Nil" };
const cons = <A>(head: A, tail: List<A>): List<A> => ({
    _tag: "Cons",
    head: head,
    tail: tail,
});

const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === "Nil";

const myList = cons(1, cons(2, cons(3, nil)));

//console.log(JSON.stringify(myList, null, 2));

type ShowList = <A>(xs: List<A>) => string;
const showList: ShowList = (xs) =>
    isNil(xs)
        ? ""
        : `${xs.head}` + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);

//console.log(showList(myList));

type Match = <A, B>(
    onNil: () => B,
    onCons: (head: A, tail: List<A>) => B,
) => (xs: List<A>) => B;
const match: Match = (onNil, onCons) => (xs) =>
    isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

export { Cons, cons, isNil, List, Nil, nil, match,showList };
