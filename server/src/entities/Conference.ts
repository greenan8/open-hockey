import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Division } from "./Division";

@ObjectType()
@Entity()
export class Conference extends BaseEntity {
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

  @Field(() => [Division])
  @OneToMany(() => Division, (division: Division) => division.conference, {
    lazy: true,
  })
  divisions: Division[];
}
