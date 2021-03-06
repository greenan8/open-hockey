import { Query, Resolver, Arg, Mutation, Authorized, ID } from "type-graphql";
import { getManager } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { Statistics } from "../entities/Statistics/Statistics";
import { SkaterStatisticsInput } from "./inputs/SkaterStatisticsInput";
import { Player } from "../entities/Player";
import { Position } from "../entities/enum/Position";
import { SkaterStatistics } from "../entities/Statistics/SkaterStatistics";
import { Team } from "../entities/Team";
import { GoalieStatistics } from "../entities/Statistics/GoalieStatistics";
import { GoalieStatisticsInput } from "./inputs/GoalieStatisticsInput";

@Resolver()
export class StatisticsResolver {
  @Query(() => Statistics, { nullable: true })
  async statistics(@Arg("id", () => ID) id: number): Promise<Statistics> {
    const statisticsRepo = getManager(process.env.NODE_ENV || "development").getRepository(Statistics);
    const statistics = await statisticsRepo.findOne({ id });

    if (!statistics) throw new ApolloError("No statistics was found.", "404");
    return statistics;
  }

  @Authorized()
  @Mutation(() => Statistics)
  async skaterStatistics(
    @Arg("playerNhlId", () => ID) playerNhlId: number,
    @Arg("statistics") input: SkaterStatisticsInput
  ): Promise<SkaterStatistics | undefined> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    const player = await playerRepo.findOne({ nhlId: playerNhlId });
    if (!player) throw new ApolloError("No player was found.", "404");
    if (player.position === Position.G) throw new ApolloError("A goalie cannot have skater statistics.");

    let statisticsId: number | undefined;
    let playerStatistics = await player.statistics;
    playerStatistics?.forEach((s: Statistics) => {
      if (
        (s.team?.abbreviation === input.team?.toUpperCase() ||
          s.teamOther?.toLowerCase() === input.teamOther?.toLocaleUpperCase()) &&
        s.season === input.season &&
        s.seasonType === input.seasonType
      ) {
        statisticsId = s.id;
      }
    });

    let data: { [k: string]: any } = {};

    Object.getOwnPropertyNames(input).forEach((prop: string) => {
      if (Object.getOwnPropertyDescriptors(input)[prop].value) {
        data[prop] = Object.getOwnPropertyDescriptors(input)[prop].value;
      }
    });

    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    if (input.team) data.team = await teamRepo.findOne({ abbreviation: input.team });
    else if (input.teamOther) data.teamOther = input.teamOther;
    else throw new ApolloError("Must be associated with either an NHL team or an other team.");

    if (input.leagueOther) data.leagueOther = input.leagueOther;
    data.season = input.season;
    data.seasonType = input.seasonType;
    data.player = player;

    const statisticsRepo = getManager(process.env.NODE_ENV || "development").getRepository(SkaterStatistics);

    if (statisticsId) {
      try {
        await statisticsRepo.update({ id: statisticsId }, data);
        return await statisticsRepo.findOne({ id: statisticsId });
      } catch (error) {
        throw new ApolloError("Failed to update a statistics record.", "409");
      }
    } else {
      try {
        const newStatistics = statisticsRepo.create(data);
        await statisticsRepo.save(newStatistics);
        return newStatistics;
      } catch (error) {
        throw new ApolloError("Failed to create a statistics record.", "409");
      }
    }
  }

  @Authorized()
  @Mutation(() => Statistics)
  async goalieStatistics(
    @Arg("playerNhlId", () => ID) playerNhlId: number,
    @Arg("statistics") input: GoalieStatisticsInput
  ): Promise<GoalieStatistics | undefined> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    const player = await playerRepo.findOne({ nhlId: playerNhlId });
    if (!player) throw new ApolloError("No player was found.", "404");
    if (player.position !== Position.G) throw new ApolloError("A skate cannot have goalie statistics.");

    let statisticsId: number | undefined;
    let playerStatistics = await player.statistics;
    playerStatistics?.forEach((s: Statistics) => {
      if (
        (s.team?.abbreviation === input.team?.toUpperCase() ||
          s.teamOther?.toLowerCase() === input.teamOther?.toLocaleUpperCase()) &&
        s.season === input.season &&
        s.seasonType === input.seasonType
      ) {
        statisticsId = s.id;
      }
    });

    let data: { [k: string]: any } = {};

    Object.getOwnPropertyNames(input).forEach((prop: string) => {
      if (Object.getOwnPropertyDescriptors(input)[prop].value) {
        data[prop] = Object.getOwnPropertyDescriptors(input)[prop].value;
      }
    });

    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    if (input.team) data.team = await teamRepo.findOne({ abbreviation: input.team });
    else if (input.teamOther) data.teamOther = input.teamOther;
    else throw new ApolloError("Must be associated with either an NHL team or an other team.");

    if (input.leagueOther) data.leagueOther = input.leagueOther;
    data.season = input.season;
    data.seasonType = input.seasonType;
    data.player = player;

    const statisticsRepo = getManager(process.env.NODE_ENV || "development").getRepository(GoalieStatistics);

    if (statisticsId) {
      try {
        await statisticsRepo.update({ id: statisticsId }, data);
        return await statisticsRepo.findOne({ id: statisticsId });
      } catch (error) {
        throw new ApolloError("Failed to update a statistics record.", "409");
      }
    } else {
      try {
        const newStatistics = statisticsRepo.create(data);
        await statisticsRepo.save(newStatistics);
        return newStatistics;
      } catch (error) {
        throw new ApolloError("Failed to create a statistics record.", "409");
      }
    }
  }
}
