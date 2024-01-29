import { Repository } from "typeorm";
import { ListCardsUsersRepository } from "../../../../data/protocols";
import { CardsUsers } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to list the cards that are related to users (CardsUsers entity).
export class ListCardsUsersMySQLRepository implements ListCardsUsersRepository {
    async list(filters: Record<string, any>): Promise<CardsUsers[]> {
        const cardsUsersRepository = MySQLHelper.getEntityRepository(CardsUsers) as Repository<CardsUsers>;

        let result;

        if (!filters) {
            result = await cardsUsersRepository.find();
        } else {
            result = await cardsUsersRepository.find({ where: filters });
        }

        return result;
    }
}