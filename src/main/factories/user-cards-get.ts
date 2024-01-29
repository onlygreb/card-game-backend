import { DBFindCardsByUser } from "../../data/usecases";
import { ListCardsUsersMySQLRepository } from "../../infra/db/mysql/cards-users-respository";
import { UserCardsGetController } from "../../presentation/controllers/user"

export const makeUserCardsGetController = (): UserCardsGetController => {
    const listCardsUsersMySQLRepository = new ListCardsUsersMySQLRepository();
    const dbFindCardsByUser = new DBFindCardsByUser(listCardsUsersMySQLRepository);
    return new UserCardsGetController(dbFindCardsByUser);
}