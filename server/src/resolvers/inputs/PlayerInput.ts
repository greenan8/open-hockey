import { InputType, Field, Int } from "type-graphql";
import { ShootsCatches } from "../../entities/enum/ShootsCatches";
import { Position } from "../../entities/enum/Position";

@InputType()
export class PlayerInput {
  @Field(() => Int, { description: "NHL API identifying number" })
  nhlId: number;

  @Field()
  fullName: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  primaryNumber?: number;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  birthCity?: string;

  @Field({ nullable: true })
  birthStateProvince?: string;

  @Field({ nullable: true })
  birthCountry?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field(() => Int, { nullable: true, description: "Centimetre Units" })
  height?: number;

  @Field(() => Int, { nullable: true, description: "Kilogram Units" })
  weight?: number;

  @Field()
  active: boolean;

  @Field()
  rookie: boolean;

  @Field()
  rosterStatus: boolean;

  @Field({ nullable: true })
  shootsCatches?: ShootsCatches;

  @Field({ nullable: true })
  position?: Position;

  @Field({
    nullable: true,
    description: "Options: Team Abbreviation (ex. MTL)",
  })
  team?: string;
}
