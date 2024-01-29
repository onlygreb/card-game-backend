import { DBBuyCard } from "../../data/usecases";
import { FindCardMySQLRepository } from "../../infra/db/mysql/card-repository";
import { AddCardsUsersMySQLRepository, FindCardsUsersMySQLRepository, UpdateCardsUsersMySQLRepository } from "../../infra/db/mysql/cards-users-respository";
import { FindUserMySQLRepository, UpdateUserMySQLRepository } from "../../infra/db/mysql/user-repository";
import { CardBuyController } from "../../presentation/controllers/card";

export const makeCardBuyController = (): CardBuyController => {
    const addCardsUsersRepository = new AddCardsUsersMySQLRepository();
    const findCardsUsersRepository = new FindCardsUsersMySQLRepository();
    const updateCardsUsersRepository = new UpdateCardsUsersMySQLRepository();
    const findCardRepository = new FindCardMySQLRepository();
    const findUserRepository = new FindUserMySQLRepository();
    const updateUserRepository = new UpdateUserMySQLRepository();
    const dbBuyCard = new DBBuyCard(addCardsUsersRepository, findCardRepository, findUserRepository, findCardsUsersRepository, updateCardsUsersRepository, updateUserRepository);
    return new CardBuyController(dbBuyCard);
}