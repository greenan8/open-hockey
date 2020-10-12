import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Team } from "./Team";
import { Conference } from "./Conference";

@ObjectType()
@Entity()
export class Division extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column({ type: "int", nullable: false, unique: true })
  nhlId: number;

  @Field()
  @Column()
  active: boolean;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column()
  nameShort: String;

  @Field()
  @Column()
  abbreviation: String;

  @Field(() => [Team])
  @OneToMany(() => Team, (team: Team) => team.division, { lazy: true })
  teams: Team[];

  @Field()
  @ManyToOne(
    () => Conference,
    (conference: Conference) => conference.divisions,
    { lazy: true }
  )
  conference: Conference;
}
