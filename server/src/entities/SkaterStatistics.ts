import { ChildEntity, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Statistics } from "./Statistics";

@ObjectType({ implements: Statistics })
@ChildEntity()
export class SkaterStatistics extends Statistics {
  @Field()
  @Column()
  assists: number;

  @Field()
  @Column()
  goals: number;

  @Field()
  @Column()
  pim: number;

  @Field()
  @Column()
  shots: number;

  @Field()
  @Column()
  games: number;

  @Field()
  @Column()
  hits: number;

  @Field()
  @Column()
  powerPlayGoals: number;

  @Field()
  @Column()
  powerPlayPoints: number;

  @Field()
  @Column()
  powerPlayTimeOnIce: number;

  @Field()
  @Column()
  evenTimeOnIce: number;

  @Field()
  @Column()
  penaltyMinutes: number;

  @Field()
  @Column()
  faceOffPct: number;

  @Field()
  @Column()
  shotPct: number;

  @Field()
  @Column()
  gameWinningGoals: number;

  @Field()
  @Column()
  overTimeGoals: number;

  @Field()
  @Column()
  shortHandedGoals: number;

  @Field()
  @Column()
  shortHandedPoints: number;

  @Field()
  @Column()
  shortHandedTimeOnIce: number;

  @Field()
  @Column()
  blocked: number;

  @Field()
  @Column()
  plusMinus: number;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column()
  shifts: number;

  @Field()
  @Column()
  timeOnIcePerGame: number;

  @Field()
  @Column()
  evenTimeOnIcePerGame: number;

  @Field()
  @Column()
  shortHandedTimeOnIcePerGame: number;

  @Field()
  @Column()
  powerPlayTimeOnIcePerGame: number;
}
