import { AddUser, UseCaseResponse, UserDTO } from "../../domain/usecases";
import { FieldMinimalCharacters, InvalidEmail, MissingField, UserNameOrEmailIsAlreadyInUse } from "../../presentation/errors/http-exceptions";
import { badRequest, created } from "../../presentation/helpers/http-helper";
import { AddUserRepository, FindUserRepository } from "../protocols";

// Use case to handle the creation of a User.
export class DBAddUser implements AddUser {
    private readonly addUserRepository: AddUserRepository;
    private readonly findUserRepository: FindUserRepository;

    constructor(addUserRepository: AddUserRepository, findUserRepository: FindUserRepository) {
        this.addUserRepository = addUserRepository;
        this.findUserRepository = findUserRepository;
    }

    async add(user: UserDTO): Promise<UseCaseResponse> {
        // Validating the user required fields.
        const requiredFields = ['userName', 'email', 'password'];

        for (const field of requiredFields) {
            if (!user[field]) {
                return {
                    error: badRequest(new MissingField(field.toString()))
                };
            }
        }

        // Validating the size of the userName following the minimum characters of 4.
        if (user.userName.length < 4) {
            return {
                error: badRequest(new FieldMinimalCharacters("userName", 4))
            };
        }

        // Validating if the email is valid.
        if (!user.email.includes('@') || !user.email.includes('.')) {
            return {
                error: badRequest(new InvalidEmail())
            };
        }

        // Validating the size of the password following the minimum characters of 6.
        if (user.password.length < 6) {
            return {
                error: badRequest(new FieldMinimalCharacters("password", 6))
            };
        }

        // Validating if already exists an User with this userName or email.
        const existingUser = await this.findUserRepository.find([{ userName: user.userName }, { email: user.email }]);

        if (existingUser) {
            return {
                error: badRequest(new UserNameOrEmailIsAlreadyInUse())
            };
        }

        const createdUser = await this.addUserRepository.add(user);

        return { result: created(createdUser) };
    }

}