import { UseCaseResponse } from "./protocols-usecases";

export interface BuyCard {
    buy(userUuid: string, cardUuid: string): Promise<UseCaseResponse>;
}