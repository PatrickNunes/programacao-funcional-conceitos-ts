export type Either<E, A> = Left<E> | Right<A>;

export interface Left<E> {
  _tag: "Left";
  left: E;
}

export interface Right<A> {
  _tag: "Right";
  right: A;
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: "Left",
  left: e,
});

export const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: "Right",
  right: a,
});

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> =>
  x._tag === "Left";

export const isRight = <E, A>(x: Either<E, A>): x is Right<A> =>
  x._tag === "Right";
export type Match = <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
) => (x: Either<E, A>) => B;

export const match: Match = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right);
