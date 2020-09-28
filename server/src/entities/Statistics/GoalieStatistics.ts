import { ChildEntity, Column } from "typeorm";
import { Field, ObjectType, Int, Float } from "type-graphql";
import { Statistics } from "./Statistics";

@ObjectType({ implements: Statistics })
@ChildEntity()
export class GoalieStatistics extends Statistics {
  @Field(() => Int, { nullable: true, description: "Second Units" })
  @Column({ type: "int", nullable: true })
  timeOnIce?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  ot?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shutouts?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  ties?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  wins?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  losses?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  saves?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  powerPlaySaves?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shortHandedSaves?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  evenSaves?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shortHandedShots?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  evenShots?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  powerPlayShots?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  savePercentage?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: "decimal", precision: 10, scale: 6, nullable: true })
  goalAgainstAverage?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  games?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  gamesStarted?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  shotsAgainst?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  goalsAgainst?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  powerPlaySavePercentage?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  shortHandedSavePercentage?: number;

  @Field(() => Float, { nullable: true, description: "Percentage Units" })
  @Column({ type: "decimal", precision: 7, scale: 6, nullable: true })
  evenStrengthSavePercentage?: number;
}
