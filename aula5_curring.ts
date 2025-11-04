const normal_sum = (val1: number, val2: number) => val1 + val2;

console.log(normal_sum(2, 3));

const sum = (val1:number) => (val2:number) => val1 + val2

console.log(sum(2)(3))

const increment = sum(1)

console.log(increment(4))

const sumWithTen = sum(10)

console.log(sumWithTen(5))

export {};
