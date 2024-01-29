import { LoginUser, UseCaseResponse } from "../../domain/usecases";
import { InvalidUserNameOrPassword } from "../../presentation/errors/http-exceptions";
import { badRequest, ok } from "../../presentation/helpers/http-helper";
import { FindUserRepository } from "../protocols";
import { compare } from "bcrypt";

// Use case to handle the login of a user.
export class DBLoginUser implements LoginUser {
    private readonly findUserRepository: FindUserRepository;

    constructor(findUserRepository: FindUserRepository) {
        this.findUserRepository = findUserRepository;
    }

    async login(userName: string, password: string): Promise<UseCaseResponse> {
        // Verifying if the content of userName and password fields are null.
        if (!userName || !password) {
            return { error: badRequest(new InvalidUserNameOrPassword()) };
        }

         // Verifying the size of the content of userName and password fields.
        if (userName.length < 4 || password.length < 6) {
            return { error: badRequest(new InvalidUserNameOrPassword()) };
        }

         // Verifying if the user exists.
        const user = await this.findUserRepository.find({ userName }, true);

        if (!user) {
            return { error: badRequest(new InvalidUserNameOrPassword()) };
        }

         // Verifying if the password is correct.
        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return { error: badRequest(new InvalidUserNameOrPassword()) };
        }

        return { result: ok(user) };
    }

}