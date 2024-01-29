import { User } from "../../domain/entities";
import { UserDTO } from "../../domain/usecases";
import { AddUserRepository, FindUserRepository } from "../protocols";
import { DBAddUser } from "./";

const makeAddUserRepositoryStub = (): AddUserRepository => {
    class AddUserRepositoryStub implements AddUserRepository {
        async add(userData: UserDTO): Promise<User> {
            const fakeUser: User = {
                uuid: "randomUuid",
                userName: userData.userName,
                coins: 1000,
                createdAt: new Date(2024, 1, 28),
                updatedAt: new Date(2024, 1, 28),
                cardsUsers: [],
                email: userData.email,
                password: userData.password
            };

            return await new Promise(resolve => resolve(fakeUser));
        }

    }
    return new AddUserRepositoryStub();
};

const makeFindUserRepositoryStub = (): FindUserRepository => {
    class FindUserRepositoryStub implements FindUserRepository {
        async find(filters: Record<string, any>, shouldBringPassword?: boolean): Promise<User> {
            const fakeUser: User = {
                uuid: "randomUuid2",
                userName: "testEqual",
                coins: 1000,
                createdAt: new Date(2024, 1, 28),
                updatedAt: new Date(2024, 1, 28),
                cardsUsers: [],
                email: "testequalmail@mail.com",
                password: "123456"
            };

            return await new Promise(resolve => resolve(fakeUser));
        }

    }
    return new FindUserRepositoryStub();
};

interface sutTypes {
    sut: DBAddUser,
    addUserRepositoryStub: AddUserRepository,
    findUserRepositoryStub: FindUserRepository
}

const makeSut = (): sutTypes => {
    const addUserRepositoryStub = makeAddUserRepositoryStub();
    const findUserRepositoryStub = makeFindUserRepositoryStub();
    const sut = new DBAddUser(addUserRepositoryStub, findUserRepositoryStub);

    return {
        sut,
        addUserRepositoryStub,
        findUserRepositoryStub
    }
};

describe("DBAddUser UseCase", () => {
    test("Should return badRequest if userName is missing.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: undefined, email: "test@test.com", password: "12345678" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Missing userName field." }, "statusCode": 400 });
    });

    test("Should return badRequest if password is missing.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "test", email: "test@test.com", password: undefined });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Missing password field." }, "statusCode": 400 });
    });

    test("Should return badRequest if email is missing.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "test", email: undefined, password: "12345678" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Missing email field." }, "statusCode": 400 });
    });

    test("Should return badRequest if email is invalid.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "test", email: "invalidmail", password: "12345678" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Email is not valid." }, "statusCode": 400 });
    });

    test("Should return badRequest if userName has less than 4 characters.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "tes", email: "test@test.com", password: "12345678" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "The field userName must have at least 4 characters." }, "statusCode": 400 });
    });

    test("Should return badRequest if password has less than 6 characters.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "test", email: "test@test.com", password: "12345" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "The field password must have at least 6 characters." }, "statusCode": 400 });
    });

    test("Should return badRequest if user or email is already in use.", async () => {
        const { sut } = makeSut();

        const { result, error } = await sut.add({ userName: "userTest", email: "testequalmail@mail.com", password: "12345678" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "UserName or Email is already in use." }, "statusCode": 400 });
    });

    test("Should create a user Successfully.", async () => {
        const { sut, addUserRepositoryStub, findUserRepositoryStub } = makeSut();

        jest.spyOn(findUserRepositoryStub, "find").mockImplementationOnce(async () => {
            return await new Promise(resolve => resolve(null));
        });

        const { result, error } = await sut.add({ userName: "userTest", email: "user@user.com", password: "12345678" });

        const expectedResult = await addUserRepositoryStub.add({ userName: "userTest", email: "user@user.com", password: "12345678" });

        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(result.statusCode).toBe(201);
        expect(result.body).toStrictEqual(expectedResult);
    });
});