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

type Match = <A, B, C>(
    onNone: () => B,
    onSome: (a: A) => C,
) => (x: Option<A>) => B | C;

const match: Match = (onNone, onSome) => (x) =>
    isNone(x) ? onNone() : onSome(x.value);

export { isNone, match, None, none, Option, some };
