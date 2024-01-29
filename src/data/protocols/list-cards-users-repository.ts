import { CardsUsers } from "../../domain/entities";

export interface ListCardsUsersRepository {
    list(filters: Record<string, any>): Promise<CardsUsers[]>;
}