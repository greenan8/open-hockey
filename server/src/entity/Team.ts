import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Field } from "type-graphql";
import { Division } from "./Division";
import { Conference } from "./Conference";

@Entity()
export class Team extends BaseEntity {
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
  abbreviation: String;

  @Field()
  @Column()
  teamName: String;

  @Field()
  @Column()
  locationName: String;

  @Field()
  @Column()
  shortName: String;

  @Field()
  @Column()
  firstYearOfPlay: number;

  @Field()
  @ManyToOne(() => Division, (division: Division) => division.id)
  division: Division;

  @Field()
  @ManyToOne(() => Conference, (conference: Conference) => conference.id)
  conference: Conference;
}
