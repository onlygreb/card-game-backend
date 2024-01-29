import { Card } from "../../domain/entities";

export interface ListCardsRepository {
    list(filters: Record<string, any>): Promise<Card[]>;
}