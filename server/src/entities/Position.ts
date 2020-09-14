import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Position extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
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

  @OneToMany(() => Player, (player: Player) => player.position)
  players: Player[];
}
