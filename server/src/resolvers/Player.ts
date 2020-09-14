import { Query, Resolver, Arg, Mutation, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { PlayerInput } from "./inputs/PlayerInput";
import { Player } from "../entities/Player";
import { Position } from "../entities/Position";
import { Team } from "../entities/Team";

@Resolver()
export class PlayerResolver {
  @Query(() => Player, { nullable: true })
  async player(@Arg("nhlId") nhlId: number): Promise<Player | undefined> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    return await playerRepo.findOne({ nhlId });
  }

  @Mutation(() => Player)
  @UseMiddleware()
  async createPlayer(@Arg("input") input: PlayerInput): Promise<Player> {
    try {
      const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
      const positionRepo = getManager(process.env.NODE_ENV || "development").getRepository(Position);
      const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);

      const newPlayer = playerRepo.create({
        nhlId: input.nhlId,
        fullName: input.fullName,
        firstName: input.firstName,
        lastName: input.lastName,
        primaryNumber: input.primaryNumber,
        birthDate: input.birthDate,
        birthCountry: input.birthCountry,
        nationality: input.nationality,
        height: input.height,
        weight: input.weight,
        active: input.active,
        rookie: input.rookie,
        shootsCatches: input.shootsCatches,
        rosterStatus: input.rosterStatus,
        position: await positionRepo.findOne({ code: input.position }),
        team: await teamRepo.findOne({ abbreviation: input.team }),
      });
      await playerRepo.save(newPlayer);
      return newPlayer;
    } catch (error) {
      throw new ApolloError("Failed to Create New Team");
    }
  }
}
