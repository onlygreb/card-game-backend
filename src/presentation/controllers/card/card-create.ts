import { AddCard } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the creation of a Card.
export class CardCreateController implements Controller {
    private readonly addCard: AddCard;

    constructor(addCard: AddCard) {
        this.addCard = addCard;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, cost } = httpRequest.body;

            const { result, error } = await this.addCard.add({ name, cost });

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