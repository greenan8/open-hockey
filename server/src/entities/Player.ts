import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, ID, Int } from "type-graphql";
import { Team } from "./Team";
import { Statistics } from "./Statistics/Statistics";
import { ShootsCatches } from "./enum/ShootsCatches";
import { Position } from "./enum/Position";
import { SkaterStatistics } from "./Statistics/SkaterStatistics";
import { GoalieStatistics } from "./Statistics/GoalieStatistics";

@ObjectType()
@Entity()
export class Player extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column({ type: "int", nullable: false, unique: true })
  nhlId: number;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  primaryNumber?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthCity?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthStateProvince?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthCountry?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nationality?: string;

  @Field(() => Int, { nullable: true, description: "Centimetre Units" })
  @Column({ type: "int", nullable: true })
  height?: number;

  @Field(() => Int, { nullable: true, description: "Kilogram Units" })
  @Column({ type: "int", nullable: true })
  weight?: number;

  @Field()
  @Column({ default: false })
  active: boolean;

  @Field()
  @Column({ default: false })
  rookie: boolean;

  @Field()
  @Column({ default: false })
  rosterStatus: boolean;

  @Field(() => ShootsCatches, { nullable: true })
  @Column({ nullable: true, enum: ShootsCatches, type: "enum" })
  shootsCatches?: ShootsCatches;

  @Field(() => Position, { nullable: true })
  @Column({ nullable: true, enum: Position, type: "enum" })
  position?: Position;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (team: Team) => team.players, {
    nullable: true,
    lazy: true,
  })
  team?: Team;

  @Field(() => [Statistics], { nullable: true })
  @OneToMany(() => Statistics, (statistics: Statistics) => statistics.player, {
    nullable: true,
    lazy: true,
  })
  statistics?: SkaterStatistics[] | GoalieStatistics[];
}
