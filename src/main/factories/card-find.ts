import { DBFindCard } from "../../data/usecases";
import { FindCardMySQLRepository } from "../../infra/db/mysql/card-repository";
import { CardFindController } from "../../presentation/controllers/card"

export const makeCardFindController = (): CardFindController => {
    const findCardRepository = new FindCardMySQLRepository();
    const dbFindCard = new DBFindCard(findCardRepository);
    return new CardFindController(dbFindCard);
}