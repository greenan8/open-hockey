import { Query, Resolver, Arg, Mutation, Authorized, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { PlayerInput } from "./inputs/PlayerInput";
import { PlayerUpdateInput } from "./inputs/PlayerUpdateInput";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { rateLimit } from "../middleware/rateLimit";

@Resolver()
export class PlayerResolver {
  @UseMiddleware(rateLimit(5, 60), rateLimit(25, 60 * 60), rateLimit(200, 60 * 60 * 24))
  @Query(() => Player, { nullable: true })
  async player(@Arg("nhlId") nhlId: number): Promise<Player> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    const player = await playerRepo.findOne({ nhlId });

    if (!player) throw new ApolloError("No player was found.", "404");
    return player;
  }

  @UseMiddleware(rateLimit(10, 60), rateLimit(50, 60 * 60), rateLimit(500, 60 * 60 * 24))
  @Query(() => [Player], { nullable: true })
  async findPlayers(@Arg("search") search: string): Promise<Player[] | undefined> {
    if (search.length < 3) throw new ApolloError("Search string must be atleast 3 characters.");
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);

    return await playerRepo
      .createQueryBuilder()
      .where("LOWER(fullName) LIKE :search", { search: `%${search.toLowerCase()}%` })
      .limit(20)
      .getMany();
  }

  @Authorized()
  @Mutation(() => Player)
  async createPlayer(@Arg("input") input: PlayerInput): Promise<Player> {
    try {
      const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
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
        position: input.position,
        team: await teamRepo.findOne({ abbreviation: input.team }),
      });

      await playerRepo.save(newPlayer);
      return newPlayer;
    } catch (error) {
      throw new ApolloError("Failed to create a player.", "409");
    }
  }

  @Authorized()
  @Mutation(() => Player)
  async updatePlayer(
    @Arg("nhlId") nhlId: number,
    @Arg("input") input: PlayerUpdateInput
  ): Promise<Player | undefined> {
    try {
      const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
      const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);

      let data: { [k: string]: any } = {};

      if (input.fullName) data.fullName = input.fullName;
      if (input.firstName) data.firstName = input.firstName;
      if (input.lastName) data.lastName = input.lastName;
      if (input.primaryNumber) data.primaryNumber = input.primaryNumber;
      if (input.birthDate) data.birthDate = input.birthDate;
      if (input.birthCountry) data.birthCountry = input.birthCountry;
      if (input.nationality) data.fullName = input.nationality;
      if (input.height) data.height = input.height;
      if (input.weight) data.weight = input.weight;
      if (input.active) data.active = input.active;
      if (input.rookie) data.rookie = input.rookie;
      if (input.shootsCatches) data.shootsCatches = input.shootsCatches;
      if (input.rosterStatus) data.rosterStatus = input.rosterStatus;
      if (input.position) data.position = input.position;
      if (input.team) data.team = await teamRepo.findOne({ abbreviation: input.team });

      await playerRepo.update({ nhlId }, data);
      return await playerRepo.findOne({ nhlId });
    } catch (error) {
      throw new ApolloError("Failed to update the player.", "409");
    }
  }
}
