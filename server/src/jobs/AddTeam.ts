import * as schedule from "node-schedule";
import fetch from "node-fetch";
import { EntityManager, getManager, Repository } from "typeorm";
import { Division } from "../entities/Division";
import { Team } from "../entities/Team";

export class addTeamJob {
  manager: EntityManager;
  divisionRepo: Repository<Division>;
  teamRepo: Repository<Team>;

  constructor() {
    this.manager = getManager(process.env.NODE_ENV || "development");
    this.divisionRepo = this.manager.getRepository(Division);
    this.teamRepo = this.manager.getRepository(Team);
  }

  public schedule() {
    schedule.scheduleJob("0 1 1 9 *", () => {
      console.log("=".repeat(45));
      console.log(`🏒  Add Team Job Has Started the Expansion Draft! 🏒`);
      console.log("=".repeat(45));
      this.request("https://statsapi.web.nhl.com/api/v1/teams")
        .then((data) => {
          //TODO: Add logic around checking and updating conferences and divisions.
          data.teams.forEach((team: any) => this.dataToTeamEntity(team));
        })
        .catch((err) => console.log(err));
    });
  }

  async request(url: string): Promise<any> {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

  async dataToTeamEntity(data: any) {
    data.nhlId = data.id;
    delete data.id;

    data.division = await this.divisionRepo.findOne({
      nhlId: data.division.id,
    });

    try {
      const newTeam = this.teamRepo.create({ ...data } as Object);
      await this.teamRepo.save(newTeam);
      return newTeam;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
