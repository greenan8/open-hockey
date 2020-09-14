import { ChildEntity, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Statistics } from "./Statistics";

@ObjectType({ implements: Statistics })
@ChildEntity()
export class GoalieStatistics extends Statistics {
  ot: number;

  @Field()
  @Column()
  shutouts: number;

  @Field()
  @Column()
  ties: number;

  @Field()
  @Column()
  wins: number;

  @Field()
  @Column()
  losses: number;

  @Field()
  @Column()
  saves: number;

  @Field()
  @Column()
  powerPlaySaves: number;

  @Field()
  @Column()
  shortHandedSaves: number;

  @Field()
  @Column()
  evenSaves: number;

  @Field()
  @Column()
  shortHandedShots: number;

  @Field()
  @Column()
  evenShots: number;

  @Field()
  @Column()
  powerPlayShots: number;

  @Field()
  @Column()
  savePercentage: number;

  @Field()
  @Column()
  goalAgainstAverage: number;

  @Field()
  @Column()
  games: number;

  @Field()
  @Column()
  gamesStarted: number;

  @Field()
  @Column()
  shotsAgainst: number;

  @Field()
  @Column()
  goalsAgainst: number;

  @Field()
  @Column()
  timeOnIcePerGame: number;

  @Field()
  @Column()
  powerPlaySavePercentage: number;

  @Field()
  @Column()
  shortHandedSavePercentage: number;

  @Field()
  @Column()
  evenStrengthSavePercentage: number;
}
