import { HKT, Kind } from "fp-ts/HKT";
import { Functor1 } from "./lib/functor.ts";
import { compose } from "./lib/compose.ts";

type IO<A> = () => A;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    "IO": IO<A>;
  }
}

const ioFunctor: Functor1<"IO"> = {
  URI: "IO",
  map: (f) => (ioA) => compose(f, ioA),
};

type RollDice = IO<number>;
const rollDice: RollDice = () => Math.ceil(Math.random() * 6);

type IsEven = (x: number) => boolean;
const isEven: IsEven = (x) => x % 2 === 0;

const ioIsEven = ioFunctor.map(isEven);
const ioConsoleLog = ioFunctor.map(console.log);

const program = ioConsoleLog(ioIsEven(rollDice));

program()
program()
program()
