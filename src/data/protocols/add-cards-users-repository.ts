import { Card, CardsUsers, User } from "../../domain/entities";

export interface AddCardsUsersRepository {
    add(card: Card, user: User): Promise<CardsUsers>;
}