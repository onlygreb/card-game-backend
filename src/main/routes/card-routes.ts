import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeCardCreateController, makeCardFindController, makeCardsGetController, makeCardBuyController } from "../factories";

// Setting up all routes related to the card table.
export default (router: Router): void => {
    router.get('/card/:uuid', adaptRoute(makeCardFindController()));
    router.post('/card', adaptRoute(makeCardCreateController()));
    router.get('/card', adaptRoute(makeCardsGetController()));
    router.post('/card/buy', adaptRoute(makeCardBuyController()));
};