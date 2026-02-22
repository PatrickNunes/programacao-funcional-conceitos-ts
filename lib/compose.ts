export type Compose = <A extends any[], B, C>(
  f: (x: B) => C,
  g: (...xs: A) => B,
) => (...xs: A) => C;

export const compose: Compose = (f, g) => (...x) => f(g(...x));
