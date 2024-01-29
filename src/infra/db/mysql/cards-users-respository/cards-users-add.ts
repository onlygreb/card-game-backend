import { Repository } from "typeorm";
import { AddCardsUsersRepository } from "../../../../data/protocols";
import { CardsUsers, User, Card } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";
import { v4 as uuidV4 } from "uuid";

// Object to interact directly to the MySQL database in order to add a CardsUsers entity record.
export class AddCardsUsersMySQLRepository implements AddCardsUsersRepository {
    async add(card: Card, user: User): Promise<CardsUsers> {
        const cardsUsersRepository = MySQLHelper.getEntityRepository(CardsUsers) as Repository<CardsUsers>;

        const cardsUsers: CardsUsers = {
            uuid: uuidV4(),
            cardUuid: card.uuid,
            userUuid: user.uuid,
            card: card,
            user: user,
            quantity: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        return await cardsUsersRepository.save(cardsUsers);
    }

}