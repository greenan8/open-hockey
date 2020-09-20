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
    try {
      const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
      const divisionRepo = getManager(process.env.NODE_ENV || "development").getRepository(
        Division
      );

      const newTeam = teamRepo.create({
        nhlId: input.nhlId,
        active: input.active,
        name: input.name,
        abbreviation: input.abbreviation,
        teamName: input.teamName,
        locationName: input.locationName,
        shortName: input.shortName,
        firstYearOfPlay: input.firstYearOfPlay,
        division: await divisionRepo.findOne({ name: input.division }),
      });

      await teamRepo.save(newTeam);
      return newTeam;
    } catch (error) {
      throw new ApolloError("Failed to Create New Team.", "409");
    }
  }
}
