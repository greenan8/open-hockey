import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Division } from "./Division";
import { Player } from "./Player";

@ObjectType()
@Entity("team")
export class Team extends BaseEntity {
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

  @Field({ nullable: true })
  @ManyToOne(() => Division, (division: Division) => division.teams, { nullable: true })
  division?: Division;
}
