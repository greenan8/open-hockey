import { registerEnumType } from "type-graphql";

export enum SeasonType {
  "PRESEASON",
  "REGULAR",
  "PLAYOFFS",
}

registerEnumType(SeasonType, {
  name: "SeasonType",
  description: "The season type that is played.",
});
