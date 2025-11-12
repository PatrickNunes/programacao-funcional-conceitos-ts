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

const myList = cons(1, cons(2, cons(3, nil)));

//console.log(JSON.stringify(myList, null, 2));

export type ShowList = <A>(xs: List<A>) => string;
export const showList: ShowList = (xs) =>
    isNil(xs)
        ? ""
        : `${xs.head}` + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);

//console.log(showList(myList));

export type Match = <A, B>(
    onNil: () => B,
    onCons: (head: A, tail: List<A>) => B,
) => (xs: List<A>) => B;
export const match: Match = (onNil, onCons) => (xs) =>
    isNil(xs) ? onNil() : onCons(xs.head, xs.tail);
