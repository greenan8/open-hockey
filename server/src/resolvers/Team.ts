import { Query, Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import { getManager } from "typeorm";
import { TeamInput } from "./inputs/TeamInput";
import { Team } from "../entities/Team";
import { Division } from "../entities/Division";

@Resolver()
export class TeamResolver {
  @Query(() => [Team], { nullable: true })
  async teams(): Promise<Team[]> {
    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    return await teamRepo.find({ active: true });
  }

  @Authorized()
  @Mutation(() => Team)
  async createTeam(@Arg("input") input: TeamInput): Promise<Team> {
    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    const divisionRepo = getManager(process.env.NODE_ENV || "development").getRepository(Division);

    let data: { [k: string]: any } = {};

    data.division = await divisionRepo.findOne({ name: input.division });

    const getValue = (key: string) => (obj: Record<string, any>) => obj[key];
    Object.getOwnPropertyNames(Team).forEach((prop: string) => {
      if (getValue(prop)(input)) data.prop = getValue(prop)(input);
    });

    try {
      const newTeam = teamRepo.create(data);
      await teamRepo.save(newTeam);
      return newTeam;
    } catch (error) {
      throw new ApolloError("Failed to Create New Team.", "409");
    }
  }
}
