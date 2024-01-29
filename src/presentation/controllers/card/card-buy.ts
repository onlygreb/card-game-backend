import { BuyCard } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the buying process of a Card using the userUuid and cardUuid as reference.
export class CardBuyController implements Controller {
    private readonly buyCard: BuyCard;

    constructor(buyCard: BuyCard) {
        this.buyCard = buyCard;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { userUuid, cardUuid } = httpRequest.body;

            const { result, error } = await this.buyCard.buy(userUuid, cardUuid);

            if (error) {
                return error;
            }

            return result;
        } catch (error) {
            console.log(`${error}`);
            return { statusCode: 500, body: error };
        }
    }
}