import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PlayerInput {
  @Field((_type) => Int, {
    nullable: false,
    description: "NHL API's identifying number",
  })
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
  birthCountry?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true, description: "Centimetre Units" })
  height?: number;

  @Field({ nullable: true, description: "Kilogram Units" })
  weight?: number;

  @Field()
  active: boolean;

  @Field()
  rookie: boolean;

  @Field({ nullable: true, description: "Options are: L, R" })
  shootsCatches?: string;

  @Field()
  rosterStatus: string;

  @Field({ nullable: true, description: "Options: L, C, R, D, G" })
  position?: string;

  @Field({
    nullable: true,
    description: "Options: Team Abbreviation (ex. MTL)",
  })
  team?: string;
}
