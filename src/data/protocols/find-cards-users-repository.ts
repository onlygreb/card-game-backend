import { CardsUsers } from "../../domain/entities";

export interface FindCardsUsersRepository {
    find(filters: Record<string, any>): Promise<CardsUsers>;
}