import { InputType, Field, Int } from "type-graphql";
import { ShootsCatches } from "../../entities/enum/ShootsCatches";
import { Position } from "../../entities/enum/Position";

@InputType()
export class PlayerUpdateInput {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  primaryNumber?: number;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  birthCountry?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field(() => Int, { nullable: true, description: "Centimetre Units" })
  height?: number;

  @Field(() => Int, { nullable: true, description: "Kilogram Units" })
  weight?: number;

  @Field({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  rookie?: boolean;

  @Field({ nullable: true })
  rosterStatus?: boolean;

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
