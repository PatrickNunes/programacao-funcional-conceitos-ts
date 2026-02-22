import { Functor1 } from "./functor.ts";
import { compose } from "./compose.ts";

export type IO<A> = () => A;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    "IO": IO<A>;
  }
}

export const ioFunctor: Functor1<"IO"> = {
  URI: "IO",
  map: (f) => (ioA) => compose(f, ioA),
};