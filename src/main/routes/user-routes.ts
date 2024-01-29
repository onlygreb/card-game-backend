import { Router } from "express";
import { makeUserCardsGetController, makeUserCreateController, makeUserLoginController } from "../factories";
import { adaptRoute } from "../adapters/express-route-adapter";

// Setting up all routes related to the user table.
export default (router: Router): void => {
    router.post('/user', adaptRoute(makeUserCreateController()));
    router.post('/user/login', adaptRoute(makeUserLoginController()));
    router.get('/user/:userUuid/cards', adaptRoute(makeUserCardsGetController()));
};