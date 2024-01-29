import { AddUser } from "../../../domain/usecases";
import { HttpRequest, HttpResponse, Controller } from "../../protocols";

// Controller to handle the creation of a User.
export class UserCreateController implements Controller {
    private readonly addUser: AddUser;

    constructor(addUser: AddUser) {
        this.addUser = addUser;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { userName, password, email } = httpRequest.body;

            const { result, error } = await this.addUser.add({ userName, email, password });

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