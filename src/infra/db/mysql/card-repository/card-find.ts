import { Repository } from "typeorm";
import { FindCardRepository } from "../../../../data/protocols";
import { Card } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to find one card.
export class FindCardMySQLRepository implements FindCardRepository {
    async find(filters: Record<string, any>): Promise<Card> {
        const cardRepository = MySQLHelper.getEntityRepository(Card) as Repository<Card>;

        const result = await cardRepository.findOne({ where: filters });

        return result;
    }
}