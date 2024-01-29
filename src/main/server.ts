import { MySQLHelper } from "../infra/db/mysql/helpers/mysql-helper";
import env from "./config/env";

// Connecting to the MySQL database using .env values, the app will only run if it's connects to the database.
MySQLHelper.connect(env.db_host, env.db_port as number, env.db_username, env.db_password, env.db_schema)
    .then(async () => {
        const app = (await (import('./config/app'))).default;
        app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) });
    }).catch(console.error);