import { CardDTO } from "../../domain/usecases";
import { Card } from "../../domain/entities";

export interface AddCardRepository {
    add(cardData: CardDTO): Promise<Card>;
}
