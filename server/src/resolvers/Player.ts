import {
  Query,
  Resolver,
  Arg,
  Mutation,
  Authorized,
  UseMiddleware,
  ID,
} from "type-graphql";
import { getManager } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { PlayerInput } from "./inputs/PlayerInput";
import { PlayerUpdateInput } from "./inputs/PlayerUpdateInput";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { rateLimit } from "../middleware/rateLimit";

@Resolver()
export class PlayerResolver {
  @UseMiddleware(rateLimit(20, 60 * 60))
  @Query(() => Player, { nullable: true })
  async player(@Arg("nhlId", () => ID) nhlId: number): Promise<Player> {
    const playerRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Player);
    const player = await playerRepo.findOne({ nhlId });

    if (!player) throw new ApolloError("No player was found.", "404");
    return player;
  }

  @UseMiddleware(rateLimit(50, 60 * 60))
  @Query(() => [Player], { nullable: true })
  async findPlayers(
    @Arg("search") search: string
  ): Promise<Player[] | undefined> {
    if (search.length < 1)
      throw new ApolloError("Search string must be atleast 3 characters.");
    const playerRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Player);

    return await playerRepo
      .createQueryBuilder()
      .orderBy(`similarity(full_name, '${search.toLowerCase()}')`, "DESC")
      .limit(20)
      .getMany();
  }

  @Authorized()
  @Mutation(() => Player)
  async createPlayer(@Arg("input") input: PlayerInput): Promise<Player> {
    const playerRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Player);
    const teamRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Team);

    let data: { [k: string]: any } = {};

    Object.getOwnPropertyNames(input).forEach((prop: string) => {
      if (Object.getOwnPropertyDescriptors(input)[prop].value) {
        data[prop] = Object.getOwnPropertyDescriptors(input)[prop].value;
      }
    });

    if (input.team)
      data.team = await teamRepo.findOne({ abbreviation: input.team });

    const newPlayer = playerRepo.create(data);
    try {
      await playerRepo.save(newPlayer);
      return newPlayer;
    } catch (error) {
      throw new ApolloError("Failed to create a player.", "409");
    }
  }

  @Authorized()
  @Mutation(() => Player)
  async updatePlayer(
    @Arg("nhlId", () => ID) nhlId: number,
    @Arg("input") input: PlayerUpdateInput
  ): Promise<Player | undefined> {
    const playerRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Player);
    const teamRepo = getManager(
      process.env.NODE_ENV || "development"
    ).getRepository(Team);

    let data: { [k: string]: any } = {};

    Object.getOwnPropertyNames(input).forEach((prop: string) => {
      if (Object.getOwnPropertyDescriptors(input)[prop].value) {
        data[prop] = Object.getOwnPropertyDescriptors(input)[prop].value;
      }
    });

    if (input.team)
      data.team = await teamRepo.findOne({ abbreviation: input.team });

    try {
      await playerRepo.update({ nhlId }, data);
      return await playerRepo.findOne({ nhlId });
    } catch (error) {
      throw new ApolloError("Failed to update the player.", "409");
    }
  }
}
