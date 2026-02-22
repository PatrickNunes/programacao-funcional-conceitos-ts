import {
  List,
  showList,
  cons,
  nil,
  isNil,
  functor as listFunctor,
} from "./lib/list.ts";
import {
  Option,
  some,
  none,
  isNone,
  functor as optionFunctor,
} from "./lib/option.ts";
import { compose } from "./lib/compose.ts";
import { Functor1 } from "./lib/functor.ts";

type Double = (x: number) => number;
const double: Double = (x) => x * 2;

const data1: Option<number> = some(12);
const output1 = optionFunctor.map(double)(data1);

console.log(output1);

type ComposeR = <A, B, C>(f: (a: A) => B, g: (b: B) => C) => (a: A) => C;
const composeR: ComposeR = (f, g) => (a) => g(f(a));
const data2 = some(cons(1, cons(2, cons(3, nil))));
const mapO = optionFunctor.map;
const mapL = listFunctor.map;
const output2 = composeR(mapL, mapO)(double)(data2);

console.log(mapO(showList)(output2));

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    OptionList: Option<List<A>>;
  }
}
const optionListFunctor: Functor1<"OptionList"> = {
  URI: "OptionList",
  map: composeR(mapL, mapO),
};

const output3 = optionListFunctor.map(double)(data2);

console.log(mapO(showList)(output3));
