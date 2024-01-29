import { CardsUsers } from "../../domain/entities";

export interface UpdateCardsUsersRepository {
    update(cardsUsers: CardsUsers): Promise<CardsUsers>;
}