import { DBAddCard } from "../../data/usecases";
import { AddCardMySQLRepository } from "../../infra/db/mysql/card-repository";
import { CardCreateController } from "../../presentation/controllers/card";

export const makeCardCreateController = (): CardCreateController => {
    const addCardRepository = new AddCardMySQLRepository();
    const dbAddCard = new DBAddCard(addCardRepository);
    return new CardCreateController(dbAddCard);
}