import { Functor1 } from "./lib/functor.ts";
import { compose } from "./lib/compose.ts";

type IO<A> = () => A;
type Task<A> = () => Promise<A>;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    "IO": IO<A>;
  }
  interface URItoKind<A> {
    "Task": Task<A>;
  }
}

const ioFunctor: Functor1<"IO"> = {
  URI: "IO",
  map: (f) => (ioA) => compose(f, ioA),
};

const taskFunctor: Functor1<"Task"> = {
  URI: "Task",
  map: (f) => (taskA) => () => taskA().then(f),
};

const MathServer = {
  randon: () => Promise.resolve(Math.random()),
};

type RollDiceSync = IO<number>;
const rollDice: RollDiceSync = () => Math.ceil(Math.random() * 6);
type RollDiceAsync = Task<number>;
const rollDice2: RollDiceAsync = () =>
  MathServer.randon().then((a) => Math.ceil(a * 6));

type IsEven = (x: number) => boolean;
const isEven: IsEven = (x) => x % 2 === 0;

const ioIsEven = ioFunctor.map(isEven);
const taskIsEven = taskFunctor.map(isEven);
const ioConsoleLog = ioFunctor.map(console.log);
const taskConsoleLog = taskFunctor.map(console.log);

const program = ioConsoleLog(ioIsEven(rollDice));
const program2 = taskConsoleLog(taskIsEven(rollDice2));

program2();
program2();
program2();
