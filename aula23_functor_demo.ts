import { compose } from "./aula4_function_composing_demo.ts";
import { match, none, Option, some } from "./aula9_option_maybe_null.ts";
import {
    cons,
    List,
    match as matchList,
    nil,
    showList,
} from "./aula14_linked_list.ts";
import {
    Either,
    left,
    match as matchEither,
    right,
} from "./aula12_either_demo.ts";

type StrLength = (x: string) => number;
const strLength: StrLength = (x) => x.length;

console.log(strLength("hello"));

type OptionStrLenght = (Fx: Option<string>) => Option<number>;
const strLength1: OptionStrLenght = match(
    () => none,
    (value: string) => some(strLength(value)),
);

console.log(strLength1(none));

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

type OptionIncrement = (x: Option<number>) => Option<number>;
const increment1: OptionIncrement = match(
    () => none,
    (value: number) => some(increment(value)),
);

console.log(increment1(some(2)));

type MapOption = <A, B>(f: (x: A) => B) => (Fx: Option<A>) => Option<B>;
const map_option: MapOption = (f) =>
    match(
        () => none,
        (value: Parameters<typeof f>[0]) => some(f(value)),
    );

const strLength2 = map_option(strLength);
const increment2 = map_option(increment);

console.log(strLength2(some("hello")));
console.log(increment2(none));

const incrementLength = compose(increment, strLength);

console.log(incrementLength("hello"));

const function1 = compose(map_option(increment), map_option(strLength));
const function2 = map_option(compose(increment, strLength));

console.log(function1(some("hello")));
console.log(function2(some("hello")));

// LISTAS

const list1: List<string> = cons("a", cons("bb", cons("ccc", nil)));

type ListStrLength = (x: List<string>) => List<number>;
type ListIncrement = (x: List<number>) => List<number>;

type MapList = <A, B>(f: (x: A) => B) => (Fx: List<A>) => List<B>;
const map_list: MapList = (f) =>
    matchList(
        () => nil,
        (head, tail) => cons(f(head), map_list(f)(tail)),
    );

const strLength3: ListStrLength = map_list(strLength);
const increment3: ListIncrement = map_list(increment);

console.log(showList(strLength3(list1)));
console.log(showList(increment3(strLength3(list1))));

// Either<E,A>

type MapEither = <A, B, E>(
    f: (x: A) => B,
) => (Fx: Either<E, A>) => Either<E, B>;
const map_either: MapEither = (f) =>
    matchEither(
        (e) => left(e),
        (a) => right(f(a)),
    );

const increment4 = map_either(increment);
const strLength4 = map_either(strLength);

console.log(increment4(right(2)));
console.log(increment4(left("error")));
console.log(strLength4(right("hello")));
console.log(strLength4(left("error")));

