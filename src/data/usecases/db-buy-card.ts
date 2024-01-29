import { CardsUsers } from "../../domain/entities";
import { BuyCard, UseCaseResponse } from "../../domain/usecases";
import { EntityNotFound, NotEnoughCoins } from "../../presentation/errors/http-exceptions";
import { badRequest, created, notFound } from "../../presentation/helpers/http-helper";
import { AddCardsUsersRepository, FindCardRepository, FindCardsUsersRepository, FindUserRepository, UpdateCardsUsersRepository, UpdateUserRepository } from "../protocols";

// Use case to handle the process of a user buying a card.
export class DBBuyCard implements BuyCard {
    private readonly addCardsUsersRepository: AddCardsUsersRepository;
    private readonly findCardsUsersRepository: FindCardsUsersRepository;
    private readonly updateCardsUsersRepository: UpdateCardsUsersRepository;
    private readonly findCardRepository: FindCardRepository;
    private readonly findUserRepository: FindUserRepository;
    private readonly updateUserRepository: UpdateUserRepository;

    constructor(addCardsUsersRepository: AddCardsUsersRepository, findCardRepository: FindCardRepository, findUserRepository: FindUserRepository, findCardsUsersRepository: FindCardsUsersRepository, updateCardsUsersRepository: UpdateCardsUsersRepository, updateUserRepository: UpdateUserRepository) {
        this.addCardsUsersRepository = addCardsUsersRepository;
        this.findCardsUsersRepository = findCardsUsersRepository;
        this.updateCardsUsersRepository = updateCardsUsersRepository;
        this.findCardRepository = findCardRepository;
        this.findUserRepository = findUserRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async buy(userUuid: string, cardUuid: string): Promise<UseCaseResponse> {
        // Searching for the user using the provided userUuid.
        const user = await this.findUserRepository.find({ uuid: userUuid });

        // If not found, then return a 404 User not found.
        if (!user) {
            return { error: notFound(new EntityNotFound("User")) };
        }

        // Searching for the card using the provided cardUuid.
        const card = await this.findCardRepository.find({ uuid: cardUuid });

        // If not found, then return a 404 Card not found.
        if (!card) {
            return { error: notFound(new EntityNotFound("Card")) };
        }

        // Verifying if the user has enough coins to buy the card.
        if (user.coins < card.cost) {
            return { error: badRequest(new NotEnoughCoins()) };
        }

        // Updating the user removing the coins based on the card cost.
        user.coins -= card.cost;
        user.updatedAt = new Date();
        await this.updateUserRepository.update(user);

        let result: CardsUsers;

        // Verifying if the record CardsUsers exists with this specific user and card.
        const possibleCardsUsers: CardsUsers = await this.findCardsUsersRepository.find({ cardUuid: card.uuid, userUuid: user.uuid });

        if (!possibleCardsUsers) {
            // If it doesn't exists then create a new one.
            result = await this.addCardsUsersRepository.add(card, user);
        } else {
            // If it exists, then increment the quantity and update it.
            possibleCardsUsers.quantity += 1;
            possibleCardsUsers.updatedAt = new Date();
            result = await this.updateCardsUsersRepository.update(possibleCardsUsers);
        }

        return { result: created(result) };
    }
}
