import { Express, Router } from "express";
import fg from "fast-glob";

// Setting up routes using the Router from express.
export default (app: Express): void => {
    const router = Router();
    // Declaring the default path to /api
    app.use('/api', router);

    fg.sync("**/src/main/routes/**routes.ts").map(async (file) => {
        (await import(`../../../${file}`)).default(router);
    });
};