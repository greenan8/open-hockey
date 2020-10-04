import { registerEnumType } from "type-graphql";

export enum Position {
  "L",
  "C",
  "R",
  "D",
  "G",
}

registerEnumType(Position, {
  name: "Position",
  description: "The player's predominat playing position.",
});
