type Increment = (x: number) => number;

const increment: Increment = (x) => x + 1;

//console.log(increment(2));

type ToString = (x: number) => string;
const tostring: ToString = (x) => `"${x}"`;

//console.log(tostring(2));

type IncrementThenToString = (x: number) => string;
const increment_then_to_string: IncrementThenToString = (x) =>
    tostring(increment(x));

//console.log(increment_then_to_string(6));

type Compose = <A, B, C>(
    f: (x: B) => C,
    g: (x: A) => B,
) => (x: A) => C;
const compose: Compose = (f, g) => (x) => f(g(x));

const increment_then_to_string2 = compose(tostring, increment);

//console.log(increment_then_to_string2(6));

export { compose };
