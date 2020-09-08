import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
// import { Position } from "./Position";

@ObjectType()
@Entity()
export class Player extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
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

  @Field()
  @Column()
  primaryNumber: number;

  @Field()
  @Column()
  birthDate: Date;

  @Field()
  @Column()
  birthCountry: string;

  @Field()
  @Column()
  nationality: string;

  @Field()
  @Column()
  height: number;

  @Field()
  @Column()
  weight: number;

  @Field()
  @Column()
  active: boolean;

  @Field()
  @Column()
  rookie: boolean;

  @Field()
  @Column()
  shootsCatches: string;

  @Field()
  @Column()
  rosterStatus: string;

  // @Field()
  // @ManyToOne(() => Position, (position: Position) => position.id)
  // primaryPosition: Position;
}
