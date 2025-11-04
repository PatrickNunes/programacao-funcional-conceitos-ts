const compose = (f: CallableFunction, g: CallableFunction) => (x: any) => f(g(x));

const increment = (x: number) => x + 1;
const toStringFunc = (x:any) => x.toString();

const increment_then_toString = compose(toStringFunc, increment);

const result = increment_then_toString(3);
console.log(result);

export{}