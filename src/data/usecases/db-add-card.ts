import { AddCard, CardDTO, UseCaseResponse } from "../../domain/usecases";
import { MissingField } from "../../presentation/errors/http-exceptions";
import { badRequest, created } from "../../presentation/helpers/http-helper";
import { AddCardRepository } from "../protocols";

// Use case to handle the creation of a Card.
export class DBAddCard implements AddCard {
    private readonly addCardRepository: AddCardRepository;

    constructor(addCardRepository: AddCardRepository) {
        this.addCardRepository = addCardRepository;
    }

    async add(card: CardDTO): Promise<UseCaseResponse> {
        // Validating the card required fields.
        const requiredFields = ['name', 'cost'];

        for (const field of requiredFields) {
            if (!card[field]) {
                return {
                    error: badRequest(new MissingField(field.toString()))
                };
            }
        }

        const createdCard = await this.addCardRepository.add(card);

        return { result: created(createdCard) };
    }

}