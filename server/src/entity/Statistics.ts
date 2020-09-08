import {
  Entity,
  TableInheritance,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field } from "type-graphql";
import { Player } from "./Player";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Statistics extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Player, (player: Player) => player.id)
  player: Player;

  @Field()
  @Column()
  playerType: String;

  @Field()
  @Column()
  season: number;

  @Field()
  @Column()
  timeOnIce: number;
}
