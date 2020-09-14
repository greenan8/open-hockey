import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType, ID, Int } from "type-graphql";
import { Position } from "./Position";
import { Team } from "./Team";
import { Statistics } from "./Statistics";

@ObjectType()
@Entity()
export class Player extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_type) => Int)
  @Column("int", { nullable: false })
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

  @Field((_type) => Int, { nullable: true })
  @Column({ nullable: true })
  primaryNumber?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthCountry?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nationality?: string;

  @Field((_type) => Int, { nullable: true, description: "Centimetre Units" })
  @Column({ nullable: true })
  height?: number;

  @Field((_type) => Int, { nullable: true, description: "Kilogram Units" })
  @Column({ nullable: true })
  weight?: number;

  @Field()
  @Column()
  active: boolean;

  @Field()
  @Column()
  rookie: boolean;

  @Field({ nullable: true, description: "Options are: L, R" })
  @Column({ nullable: true })
  shootsCatches?: string;

  @Field()
  @Column()
  rosterStatus: string;

  @Field({ nullable: true })
  @ManyToOne(() => Position, (position: Position) => position.players, {
    nullable: true,
  })
  position?: Position;

  @Field({ nullable: true })
  @ManyToOne(() => Team, (team: Team) => team.players, { nullable: true })
  team?: Team;

  @OneToMany(() => Statistics, (statistics: Statistics) => statistics.id)
  statistics: Statistics[];
}
