import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Card } from "./card";

@Entity('cards_users')
export class CardsUsers {
    @PrimaryColumn()
    uuid: string;

    @Column()
    cardUuid: string;

    @Column()
    userUuid: string;

    @Column()
    quantity: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.cardsUsers)
    user: User;

    @ManyToOne(() => Card, (card) => card.cardsUsers, { eager: true })
    card: Card;
}