import { Repository } from "typeorm";
import { UpdateCardsUsersRepository } from "../../../../data/protocols";
import { CardsUsers } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to update the CardsUsers entity.
export class UpdateCardsUsersMySQLRepository implements UpdateCardsUsersRepository {
    async update(cardsUsers: CardsUsers): Promise<CardsUsers> {
        const cardsUsersRepository = MySQLHelper.getEntityRepository(CardsUsers) as Repository<CardsUsers>;

        const result = await cardsUsersRepository.save(cardsUsers);

        return result;
    }

}