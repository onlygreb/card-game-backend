import { DBGetCards } from "../../data/usecases";
import { ListCardsMySQLRepository } from "../../infra/db/mysql/card-repository";
import { CardsGetController } from "../../presentation/controllers/card"

export const makeCardsGetController = (): CardsGetController => {
    const findCardRepository = new ListCardsMySQLRepository();
    const dbFindCard = new DBGetCards(findCardRepository);
    return new CardsGetController(dbFindCard);
}