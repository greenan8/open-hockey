import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Team } from "./Team";
import { Conference } from "./Conference";

@ObjectType()
@Entity()
export class Division extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
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

  @OneToMany(() => Team, (team: Team) => team.id)
  teams: Team[];

  @Field()
  @ManyToOne(() => Conference, (conference: Conference) => conference.divisions)
  conference: Conference;
}
