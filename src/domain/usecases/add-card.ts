import { UseCaseResponse } from "./protocols-usecases";

export interface CardDTO {
    name: string;
    cost: number;
}

export interface AddCard {
    add(card: CardDTO): Promise<UseCaseResponse>;
}