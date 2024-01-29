# Project simulating a back-end of a card game using NodeJs and TypeScript.
On this project I've used mostly clean architecture and solid practices.

## Steps to run this project:

1. Create a .env file.
2. Fill the .env file following the .envExample file.
3. Your MySQL database must be setted with a schema provided on the .env in order to run correctly (there's no need to create tables).
4. Run `npm install` command to grab all dependencies.
5. Run `npm run start` command to start the project or run `npm run test` to run the unit tests.

## Endpoints

### User endpoints

`/api/user` provinding a POST request with the body:

{
    "userName": "YourUserName",
    "email": "YourEmail",
    "password": "YourPassword"
}

In order to create an User.

`/api/user/login` provinding a POST request with the body:

{
    "userName": "YourUserName",
    "password": "YourPassword"
}

In order to login getting the data from your User.

`/api/user/{your user id}/cards` provinding a Get request in order to get all cards related to this user.

### Card endpoints

`/api/card` provinding a Get request in order to get all cards also you can user `/api/card?name={name of the card}&cost={cost of the card}` in order to filter what cards that you want to list.

`/api/card` provinding a POST request with the body:

{
    "name": "Name of the card",
    "cost": Cost of the card as a number
}

In order to create a Card on the database.

`/api/card/{card id}` provinding a Get request in order to a specific Card following the provided uuid.

`/api/card/buy` provinding a POST request with the body:

{
    "userUuid": "YourUserId",
    "cardUuid": "DesiredCardId"
}

In order to create a CardsUsers entity record on the database, attaching to the provided card and user.
