import { FindCard } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the search for a Card returning only one.
export class CardFindController implements Controller {
    private readonly findCard: FindCard;

    constructor(findCard: FindCard) {
        this.findCard = findCard;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { uuid } = httpRequest.params;

            const { result, error } = await this.findCard.find({ uuid });

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