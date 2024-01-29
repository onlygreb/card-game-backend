import { GetCards } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the search of Cards returning more than one.
export class CardsGetController implements Controller {
    private readonly getCards: GetCards;

    constructor(getCards: GetCards) {
        this.getCards = getCards;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, cost } = httpRequest.query;

            const { result, error } = await this.getCards.get({ name, cost });

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