import { LoginUser } from "../../../domain/usecases";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

// Controller to handle the login of an User.
export class UserLoginController implements Controller {
    private readonly loginUser: LoginUser;

    constructor(loginUser: LoginUser) {
        this.loginUser = loginUser;
    }

    async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
        try {
            const { userName, password } = httpRequest.body;

            const { result, error } = await this.loginUser.login(userName, password);

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