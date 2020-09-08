import { Query, Resolver, Arg } from "type-graphql";
import { Player } from "../entity/Player";
import { getConnection } from "typeorm";

@Resolver()
export class PlayerResolver {
  @Query(() => Player, { nullable: true })
  async player(@Arg("nhlId") nhlId: number): Promise<Player | undefined> {
    return await getConnection(process.env.NODE_ENV || "development")
      .getRepository(Player)
      .createQueryBuilder("player")
      .where("player.nhlId = :nhlId", { nhlId: nhlId })
      .getOne();
  }
}
