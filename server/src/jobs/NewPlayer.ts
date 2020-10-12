import * as schedule from "node-schedule";
import fetch from "node-fetch";
import { EntityManager, getManager, Repository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { SeasonType } from "../entities/enum/SeasonType";
import { SkaterStatistics } from "../entities/Statistics/SkaterStatistics";
import { GoalieStatistics } from "../entities/Statistics/GoalieStatistics";
import { Position } from "../entities/enum/Position";
import { ShootsCatches } from "../entities/enum/ShootsCatches";

//TODO: Goalie Statistics and finalize statistics

export class NewPlayerJob {
  manager: EntityManager;
  playerRepo: Repository<Player>;
  teamRepo: Repository<Team>;
  skaterStatsRepo: Repository<SkaterStatistics>;
  goalieStatsRepo: Repository<GoalieStatistics>;

  constructor() {
    this.manager = getManager(process.env.NODE_ENV || "development");
    this.playerRepo = this.manager.getRepository(Player);
    this.teamRepo = this.manager.getRepository(Team);
    this.skaterStatsRepo = this.manager.getRepository(SkaterStatistics);
    this.goalieStatsRepo = this.manager.getRepository(GoalieStatistics);
  }

  public schedule() {
    schedule.scheduleJob("58 * * * *", () => {
      console.log("=".repeat(45));
      console.log(`🏒  New Player Job Has Dropped the Puck! 🏒`);
      console.log("=".repeat(45));
      Promise.all(
        [...Array(1)].map((_val, i) => {
          const letter = String.fromCharCode(i + 97);
          return this.request(
            `https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${letter}/1`
          );
        })
      )
        .then((data) => {
          let ids: Array<number> = [];
          data.forEach((data) =>
            data.suggestions.forEach((val: string) =>
              ids.push(Number(val.split("|")[0]))
            )
          );
          // throw new Error()
          new Set(ids).forEach((id) => this.processPlayer(id));
        })
        .catch((error) => console.error(error));
    });
  }

  async request(url: string): Promise<any> {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

  processPlayer(nhlId: number) {
    this.manager
      .query(`select exists(select 1 from player where nhl_id = ${nhlId});`)
      .then((result) => {
        if (result[0].exists) {
          this.request(
            `https://statsapi.web.nhl.com/api/v1/people/${nhlId}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs`
          ).then((data) => {
            this.dataToPlayerEntity(data.people[0]).then(
              (newPlayer: Player | undefined) => {
                if (newPlayer && newPlayer.position !== Position.G)
                  this.dataToStatsEntity(data.people[0], newPlayer);
              }
            );
          });
        }
      });
  }

  async dataToPlayerEntity(data: any) {
    data.nhlId = data.id;
    delete data.id;

    const split = data.height.replace('"', "").split("' ");
    data.height = Math.round(
      Number(split[0]) * 30.48 + Number(split[1]) * 2.54
    );
    data.weight = Math.round(data.weight * 0.453592);

    data.rosterStatus = data.rosterStatus === "Y";
    data.position = Position[data.primaryPosition.code];
    data.shootsCatches =
      data.shootsCatches === "R" ? ShootsCatches.RIGHT : ShootsCatches.LEFT;

    if (data.currentTeam) {
      data.team = await this.teamRepo.findOne({
        nhlId: data.currentTeam.id,
      });
    }

    try {
      const newPlayer = this.playerRepo.create({ ...data } as Object);
      await this.playerRepo.save(newPlayer);
      return newPlayer;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async dataToStatsEntity(data: any, player: Player | undefined) {
    let regularStats = data.stats.find(
      (s: any) => s.type.displayName === "yearByYear"
    ).splits;
    let playoffStats = data.stats.find(
      (s: any) => s.type.displayName === "yearByYearPlayoffs"
    ).splits;

    regularStats.forEach((s: any) => {
      s.seasonType = SeasonType.REGULAR;
    });
    playoffStats.forEach((s: any) => {
      s.seasonType = SeasonType.PLAYOFFS;
    });

    const statsData = [...regularStats, ...playoffStats];

    await statsData.forEach(async (s) => {
      console.log(s);
      if (s.league.id === 133) {
        s.team = await this.teamRepo.findOne({ nhlId: s.team.id });
      } else {
        s.teamOther = s.team.name;
        delete s.team;
        s.leagueOther = s.league.name;
      }

      s.season = Number(s.season.slice(0, 4));
      s.seasonType = s.seasonType;
      s.player = player;

      for (const key in s.stat) {
        if (
          key in
          [
            "timeOnIce",
            "powerPlayTimeOnIce",
            "evenTimeOnIce",
            "penaltyMinutes",
            "shortHandedTimeOnIce",
          ]
        ) {
          const split = s.stat[key].split(":");
          s[key] =
            split[0] * 60 * 60 + (split.length === 2 ? split[1] * 60 : 0);
        } else if (key in ["faceOffPct", "shotPct"]) {
          s[key] = s.stat[key] / 100;
        }
      }
    });

    await statsData.forEach(async (data: any) => {
      try {
        const newStatistics = this.skaterStatsRepo.create(data);
        await this.skaterStatsRepo.save(newStatistics);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
