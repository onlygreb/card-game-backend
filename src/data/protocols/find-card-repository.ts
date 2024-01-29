import { Card } from "../../domain/entities";

export interface FindCardRepository {
    find(filters: Record<string, any>): Promise<Card>;
}