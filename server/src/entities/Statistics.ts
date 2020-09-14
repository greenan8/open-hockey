import { Entity, TableInheritance, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, InterfaceType } from "type-graphql";
import { Player } from "./Player";

@InterfaceType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Statistics extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player: Player) => player.statistics)
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
