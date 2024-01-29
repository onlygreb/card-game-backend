import { Express } from "express";
import { bodyParser, cors } from "../middlewares";

export default (app: Express) => {
    // Setting up middlewares.
    // Using json as BodyParser.
    app.use(bodyParser);
    // Setting up CORS values.
    app.use(cors);
};