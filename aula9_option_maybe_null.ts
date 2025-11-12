export type Option<A> = Some<A> | None;

export interface Some<A> {
    readonly _tag: "Some";
    readonly value: A;
}

export interface None {
    readonly _tag: "None";
}

export const some = <A>(a: A): Option<A> => ({
    _tag: "Some",
    value: a,
});

export const none: Option<never> = {
    _tag: "None",
};

export const isNone = <A>(x: Option<A>): x is None => x._tag === "None";

export type Match = <A, B, C>(
    onNone: () => B,
    onSome: (a: A) => C,
) => (x: Option<A>) => B | C;

export const match: Match = (onNone, onSome) => (x) =>
    isNone(x) ? onNone() : onSome(x.value);
