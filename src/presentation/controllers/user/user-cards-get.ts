import { FindCardsByUser } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the search of Cards bought by a user, following the userUuid.
export class UserCardsGetController implements Controller {
    private readonly findCardsByUser: FindCardsByUser;

    constructor(findCardsByUser: FindCardsByUser) {
        this.findCardsByUser = findCardsByUser;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { userUuid } = httpRequest.params;

            const { result, error } = await this.findCardsByUser.find(userUuid);

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