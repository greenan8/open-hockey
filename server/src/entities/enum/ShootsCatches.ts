import { registerEnumType } from "type-graphql";

export enum ShootsCatches {
  "LEFT",
  "RIGHT",
}

registerEnumType(ShootsCatches, {
  name: "ShootsCatches",
  description: "The hand a player predominantly shoots or catches.",
});
