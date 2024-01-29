import { GetCards, UseCaseResponse } from "../../domain/usecases";
import { EntityNotFound } from "../../presentation/errors/http-exceptions";
import { noContent, notFound, ok } from "../../presentation/helpers/http-helper";
import { ListCardsRepository } from "../protocols";

// Use case to handle the list of cards.
export class DBGetCards implements GetCards {
    private readonly listCardsRepository: ListCardsRepository;

    constructor(listCardsRepository: ListCardsRepository) {
        this.listCardsRepository = listCardsRepository;
    }

    async get(filters: Record<string, any>): Promise<UseCaseResponse> {
        // listing the cards following the provided filter.
        const card = await this.listCardsRepository.list(filters);

        if (!card) {
            return { error: notFound(new EntityNotFound("Card")) };
        }

        // If no card has been found, then return 204 noContent.
        if (card.length == 0) return { result: noContent(card) };

        return { result: ok(card) };
    }
}