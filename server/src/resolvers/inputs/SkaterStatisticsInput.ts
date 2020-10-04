import { InputType, Field, Int, Float } from "type-graphql";
import { SeasonType } from "../../entities/enum/SeasonType";

@InputType()
export class SkaterStatisticsInput {
  @Field({
    nullable: true,
    description: "Options: Team Abbreviation (ex. MTL)",
  })
  team?: string;

  @Field({ nullable: true, description: "Team name if not in the NHL." })
  teamOther?: String;

  @Field({ nullable: true, description: "League name if not in the NHL." })
  leagueOther?: String;

  @Field(() => Int, { description: "The year the season will end in." })
  season: number;

  @Field(() => SeasonType)
  seasonType: SeasonType;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  timeOnIce?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  shotPct?: number;

  @Field(() => Int, { nullable: true })
  gameWinningGoals?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  overTimeGoals?: number;

  @Field(() => Int, { nullable: true })
  shortHandedGoals?: number;

  @Field(() => Int, { nullable: true })
  shortHandedPoints?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  shortHandedTimeOnIce?: number;

  @Field(() => Int, { nullable: true })
  blocked?: number;

  @Field(() => Int, { nullable: true })
  plusMinus?: number;

  @Field(() => Int, { nullable: true })
  points?: number;

  @Field(() => Int, { nullable: true })
  shifts?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  timeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  evenTimeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  shortHandedTimeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  powerPlayTimeOnIcePerGame?: number;
}
