import { Card } from "../../domain/entities";
import { CardDTO } from "../../domain/usecases";
import { AddCardRepository } from "../protocols";
import { DBAddCard } from "./db-add-card";

const makeAddCardRepositoryStub = (): AddCardRepository => {
    class AddCardRepositoryStub implements AddCardRepository {
        async add(cardData: CardDTO): Promise<Card> {
            const fakeCard: Card = {
                uuid: "randomUuid",
                name: cardData.name,
                cost: cardData.cost,
                createdAt: new Date(2024, 1, 28),
                updatedAt: new Date(2024, 1, 28),
                cardsUsers: []
            };

            return await new Promise(resolve => resolve(fakeCard));
        }

    }
    return new AddCardRepositoryStub();
};

interface sutTypes {
    sut: DBAddCard,
    addCardRepositoryStub: AddCardRepository
}

const makeSut = (): sutTypes => {
    const addCardRepositoryStub = makeAddCardRepositoryStub();
    const sut = new DBAddCard(addCardRepositoryStub);

    return {
        sut,
        addCardRepositoryStub
    }
};

describe("DBAddCard UseCase", () => {
    test("Should return badRequest if name is missing.", async () => {
        const { sut } = makeSut();


        const { result, error } = await sut.add({ cost: 25, name: undefined });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Missing name field." }, "statusCode": 400 });
    });

    test("Should return badRequest if coins is missing.", async () => {
        const { sut } = makeSut();


        const { result, error } = await sut.add({ cost: undefined, name: "name" });

        expect(error).toBeDefined();
        expect(error).toStrictEqual({ "body": { "message": "Missing cost field." }, "statusCode": 400 });
    });

    test("Should create a card Successfully.", async () => {
        const { sut, addCardRepositoryStub } = makeSut();


        const { result, error } = await sut.add({ cost: 25, name: "name" });

        const expectedResult = await addCardRepositoryStub.add({ cost: 25, name: "name" });

        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(result.statusCode).toBe(201);
        expect(result.body).toStrictEqual(expectedResult);
    });
});