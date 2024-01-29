import { Repository } from "typeorm";
import { FindCardsUsersRepository } from "../../../../data/protocols";
import { CardsUsers } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to search for a CardsUsers entity record.
export class FindCardsUsersMySQLRepository implements FindCardsUsersRepository {
    async find(filters: Record<string, any>): Promise<CardsUsers> {
        const cardsUsersRepository = MySQLHelper.getEntityRepository(CardsUsers) as Repository<CardsUsers>;

        const result = await cardsUsersRepository.findOne({ where: filters });

        return result;
    }

}