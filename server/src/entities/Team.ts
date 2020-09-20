import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType, ID, Root } from "type-graphql";
import { Division } from "./Division";
import { Player } from "./Player";
import { Statistics } from "./Statistics/Statistics";

@ObjectType()
@Entity("team")
export class Team extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  nhlId: number;

  @Field()
  @Column()
  active: boolean;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column({ unique: true })
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

  @OneToMany(() => Player, (player: Player) => player.id)
  players: Player[];

  @Field(() => [Player])
  roster(@Root() team: Team): Player[] {
    return team.players.filter((player) => player.rosterStatus);
  }

  @OneToMany(() => Statistics, (statistics: Statistics) => statistics.id, { nullable: true })
  statistics?: Statistics[];

  @Field({ nullable: true })
  @ManyToOne(() => Division, (division: Division) => division.teams, { nullable: true, lazy: true })
  division?: Division;
}
