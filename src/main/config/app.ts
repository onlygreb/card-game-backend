import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

// Declaring app using express and setting up middlewares and routes.
const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;