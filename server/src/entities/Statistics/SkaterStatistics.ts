import { ChildEntity, Column } from "typeorm";
import { Field, ObjectType, Int, Float } from "type-graphql";
import { Statistics } from "./Statistics";

@ObjectType({ implements: Statistics })
@ChildEntity()
export class SkaterStatistics extends Statistics {
  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  timeOnIce?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  assists?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  goals?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  pim?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shots?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  games?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  hits?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  powerPlayGoals?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  powerPlayPoints?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  powerPlayTimeOnIce?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  evenTimeOnIce?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  penaltyMinutes?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  faceOffPct?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  shotPct?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  gameWinningGoals?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  overTimeGoals?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shortHandedGoals?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shortHandedPoints?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  shortHandedTimeOnIce?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  blocked?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  plusMinus?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  points?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shifts?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  timeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  evenTimeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  shortHandedTimeOnIcePerGame?: number;

  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  powerPlayTimeOnIcePerGame?: number;
}
