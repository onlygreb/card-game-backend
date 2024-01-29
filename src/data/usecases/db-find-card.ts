import { FindCard, UseCaseResponse } from "../../domain/usecases";
import { EntityNotFound } from "../../presentation/errors/http-exceptions";
import { notFound, ok } from "../../presentation/helpers/http-helper";
import { FindCardRepository } from "../protocols";

// Use case to handle the search of a Card.
export class DBFindCard implements FindCard {
    private readonly findCardRepository: FindCardRepository;

    constructor(findCardRepository: FindCardRepository) {
        this.findCardRepository = findCardRepository;
    }

    async find(filters: Record<string, any>): Promise<UseCaseResponse> {
        // Searching the card with the provided filter
        const card = await this.findCardRepository.find(filters);

        // If card has been not found then it'll return Card not found 404.
        if (!card) {
            return { error: notFound(new EntityNotFound("Card")) };
        }

        return { result: ok(card) };
    }

}