import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Division } from "./Division";

@ObjectType()
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

  @OneToMany(() => Division, (division: Division) => division.id)
  divisions: Division[];
}
