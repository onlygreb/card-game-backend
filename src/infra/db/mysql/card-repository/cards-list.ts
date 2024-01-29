import { Repository } from "typeorm";
import { ListCardsRepository } from "../../../../data/protocols";
import { Card } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to list all cards or filter them.
export class ListCardsMySQLRepository implements ListCardsRepository {
    async list(filters: Record<string, any>): Promise<Card[]> {
        const cardRepository = MySQLHelper.getEntityRepository(Card) as Repository<Card>;

        let result;

        if (!filters) {
            result = await cardRepository.find();
        } else {
            result = await cardRepository.find({ where: filters });
        }

        return result;
    }
}