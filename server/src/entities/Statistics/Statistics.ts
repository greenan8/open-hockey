import { Entity, TableInheritance, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, InterfaceType, ID, Int } from "type-graphql";
import { Player } from "../Player";
import { Team } from "../Team";
import { SeasonType } from "../enum/SeasonType";

@InterfaceType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Statistics extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Player)
  @ManyToOne(() => Player, (player: Player) => player.statistics)
  player: Player;

  @Field(() => Team)
  @ManyToOne(() => Team, (team: Team) => team.statistics, { nullable: true, lazy: true })
  team?: Team;

  @Field({ nullable: true, description: "Team name if not in the NHL." })
  @Column({ nullable: true })
  teamOther?: String;

  @Field({ nullable: true, description: "League name if not in the NHL." })
  @Column({ nullable: true })
  leagueOther?: String;

  @Field(() => Int)
  @Column({ type: "int" })
  season: number;

  @Field(() => SeasonType)
  @Column({ enum: SeasonType, type: "enum", default: SeasonType.REGULAR })
  seasonType: SeasonType;
}
