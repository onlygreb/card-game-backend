import { AddCardRepository } from "../../../../data/protocols";
import { Card } from "../../../../domain/entities";
import { CardDTO } from "../../../../domain/usecases";
import { v4 as uuidV4 } from "uuid";
import { MySQLHelper } from "../helpers/mysql-helper";
import { Repository } from "typeorm";

// Object to interact directly to the MySQL database in order to add a Card.
export class AddCardMySQLRepository implements AddCardRepository {
    async add(cardData: CardDTO): Promise<Card> {
        const { name, cost } = cardData;

        const card: Card = {
            uuid: uuidV4(),
            name,
            cost,
            createdAt: new Date(),
            updatedAt: new Date(),
            cardsUsers: []
        };

        const cardRepository = MySQLHelper.getEntityRepository(Card) as Repository<Card>;

        return await cardRepository.save(card);
    }

}