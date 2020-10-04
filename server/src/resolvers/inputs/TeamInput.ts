import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TeamInput {
  @Field(() => Int)
  nhlId: number;

  @Field()
  active: boolean;

  @Field()
  name: String;

  @Field()
  abbreviation: String;

  @Field()
  teamName: String;

  @Field()
  locationName: String;

  @Field()
  shortName: String;

  @Field(() => Int)
  firstYearOfPlay: number;

  @Field({ nullable: true, description: "Enter the Division Name." })
  division?: String;
}
