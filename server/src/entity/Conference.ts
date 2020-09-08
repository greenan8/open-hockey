import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Field } from "type-graphql";
import { Division } from "./Division";

@Entity()
export class Conference extends BaseEntity {
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

  @Field()
  @OneToMany(() => Division, (division: Division) => division.id)
  division: Division;
}
