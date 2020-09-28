import { Query, Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { getManager } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { Statistics } from "../entities/Statistics/Statistics";
import { SkaterStatisticsInput } from "./inputs/SkaterStatisticsInput";
import { Player } from "src/entities/Player";
import { Position } from "src/entities/enum/Position";
import { SkaterStatistics } from "src/entities/Statistics/SkaterStatistics";
import { Team } from "src/entities/Team";
import { GoalieStatistics } from "src/entities/Statistics/GoalieStatistics";
import { GoalieStatisticsInput } from "./inputs/GoalieStatisticsInput";

@Resolver()
export class StatisticsResolver {
  @Query(() => Statistics, { nullable: true })
  async statistics(@Arg("id") id: number): Promise<Statistics> {
    const statisticsRepo = getManager(process.env.NODE_ENV || "development").getRepository(Statistics);
    const statistics = await statisticsRepo.findOne({ id });

    if (!statistics) throw new ApolloError("No statistics was found.", "404");
    return statistics;
  }

  @Authorized()
  @Mutation(() => Statistics)
  async skaterStatistics(
    @Arg("playerNhlId") playerNhlId: number,
    @Arg("statistics") input: SkaterStatisticsInput
  ): Promise<SkaterStatistics | undefined> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    const player = await playerRepo.findOne({ nhlId: playerNhlId });
    if (!player) throw new ApolloError("No player was found.", "404");
    if (player.position === Position.G) throw new ApolloError("A goalie cannot have skater statistics.");

    let statisticsId: number | undefined;
    player.statistics.forEach((s: Statistics) => {
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

    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    if (input.team) data.team = await teamRepo.findOne({ abbreviation: input.team });
    else if (input.teamOther) data.teamOther = input.teamOther;
    else throw new ApolloError("Must be associated with either an NHL team or an other team.");

    if (input.leagueOther) data.leagueOther = input.leagueOther;
    data.season = input.season;
    data.seasonType = input.seasonType;
    data.player = player;

    const getValue = (key: string) => (obj: Record<string, any>) => obj[key];
    Object.getOwnPropertyNames(SkaterStatistics).forEach((prop: string) => {
      if (getValue(prop)(input)) data.prop = getValue(prop)(input);
      else data.prop = 0;
    });

    // if(input.timeOnIce) data.timeOnIce = input.timeOnIce;
    // if(input.shotPct) data.shotPct = input.shotPct;
    // if(input.gameWinningGoals) data.gameWinningGoals = input.gameWinningGoals;
    // if(input.overTimeGoals) data.overTimeGoals = input.overTimeGoals;
    // if(input.shortHandedGoals) data.shortHandedGoals = input.shortHandedGoals;
    // if(input.shortHandedPoints) data.shortHandedPoints = input.shortHandedPoints;
    // if(input.shortHandedTimeOnIce) data.shortHandedTimeOnIce = input.shortHandedTimeOnIce;
    // if(input.blocked) data.blocked = input.blocked;
    // if(input.plusMinus) data.plusMinus = input.plusMinus;
    // if(input.points) data.points = input.points;
    // if(input.shifts) data.shifts = input.shifts;
    // if(input.timeOnIcePerGame) data.timeOnIcePerGame = input.timeOnIcePerGame;
    // if(input.evenTimeOnIcePerGame) data.evenTimeOnIcePerGame = input.evenTimeOnIcePerGame;
    // if(input.shortHandedTimeOnIcePerGame) data.shortHandedTimeOnIcePerGame = input.shortHandedTimeOnIcePerGame;
    // if(input.powerPlayTimeOnIcePerGame) data.powerPlayTimeOnIcePerGame = input.powerPlayTimeOnIcePerGame;

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
        return await statisticsRepo.create(data);
      } catch (error) {
        throw new ApolloError("Failed to create a statistics record.", "409");
      }
    }
  }

  @Authorized()
  @Mutation(() => Statistics)
  async goalieStatistics(
    @Arg("playerNhlId") playerNhlId: number,
    @Arg("statistics") input: GoalieStatisticsInput
  ): Promise<GoalieStatistics | undefined> {
    const playerRepo = getManager(process.env.NODE_ENV || "development").getRepository(Player);
    const player = await playerRepo.findOne({ nhlId: playerNhlId });
    if (!player) throw new ApolloError("No player was found.", "404");
    if (player.position !== Position.G) throw new ApolloError("A skate cannot have goalie statistics.");

    let statisticsId: number | undefined;
    player.statistics.forEach((s: Statistics) => {
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

    const teamRepo = getManager(process.env.NODE_ENV || "development").getRepository(Team);
    if (input.team) data.team = await teamRepo.findOne({ abbreviation: input.team });
    else if (input.teamOther) data.teamOther = input.teamOther;
    else throw new ApolloError("Must be associated with either an NHL team or an other team.");

    if (input.leagueOther) data.leagueOther = input.leagueOther;
    data.season = input.season;
    data.seasonType = input.seasonType;
    data.player = player;

    const getValue = (key: string) => (obj: Record<string, any>) => obj[key];
    Object.getOwnPropertyNames(SkaterStatistics).forEach((prop: string) => {
      if (getValue(prop)(input)) data.prop = getValue(prop)(input);
      else data.prop = 0;
    });

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
        return await statisticsRepo.create(data);
      } catch (error) {
        throw new ApolloError("Failed to create a statistics record.", "409");
      }
    }
  }
}
