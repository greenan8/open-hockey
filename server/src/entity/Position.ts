import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field } from "type-graphql";

@Entity()
export class Position extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: String;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column()
  type: String;

  @Field()
  @Column()
  abbreviation: String;
}
