import { CardsUsers } from "../../domain/entities";
import { FindCardsByUser, UseCaseResponse } from "../../domain/usecases";
import { EntityNotFound } from "../../presentation/errors/http-exceptions";
import { noContent, notFound, ok } from "../../presentation/helpers/http-helper";
import { ListCardsUsersRepository } from "../protocols";

// Use case to handle the list of Cards by User provided.
export class DBFindCardsByUser implements FindCardsByUser {
    private readonly listCardsUsersRepository: ListCardsUsersRepository;

    constructor(listCardsUsersRepository: ListCardsUsersRepository) {
        this.listCardsUsersRepository = listCardsUsersRepository;
    }

    async find(userUuid: string): Promise<UseCaseResponse> {
        // Listing the CardsUsers with the userUuid.
        const cardsUsers: CardsUsers[] = await this.listCardsUsersRepository.list({ userUuid });

        if (!cardsUsers) {
            return { error: notFound(new EntityNotFound("Cards by User")) };
        }

        // If no card by this user has been found, then return 204 noContent.
        if (cardsUsers.length == 0) return { result: noContent(cardsUsers) };

        return { result: ok(cardsUsers) };
    }

}