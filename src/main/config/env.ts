import dotenv from "dotenv";

dotenv.config();
// Exporting .env values, if not found then it'll return some mocked values.
export default {
    db_host: process.env.DB_HOST || "localhost",
    db_port: process.env.DB_PORT || 3306,
    db_username: process.env.DB_USERNAME || "adm",
    db_password: process.env.DB_PASSWORD || "admin",
    db_schema: process.env.DB_SCHEMA || "card_game",
    port: process.env.PORT || 5050
}