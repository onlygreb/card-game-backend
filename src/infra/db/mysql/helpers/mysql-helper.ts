import "reflect-metadata"
import { DataSource } from "typeorm"
import { Card, CardsUsers, User } from "../../../../domain/entities";

// MySQLHelper instantiated to contain commom interaction with the database.
export const MySQLHelper = {
    client: null as DataSource,

    // Connecting to the database.
    async connect(host: string, port: number, username: string, password: string, database: string): Promise<void> {
        this.client = new DataSource({
            type: "mysql",
            host,
            port,
            username,
            password,
            database,
            synchronize: true,
            logging: false,
            entities: [User, Card, CardsUsers],
            migrations: [],
            subscribers: [],
            migrationsTableName: "migrations_table",
        });

        await this.client.initialize();
    },

    // Function to disconnect to the database.
    async disconnect(): Promise<void> {
        await this.client.close()
    },

    // Function to access a repository (table) using provided entity as reference.
    getEntityRepository(entity: any): any {
        const repository = this.client.getRepository(entity);
        return repository;
    }
}