import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { CardsUsers } from ".";

@Entity('card')
export class Card {
    @PrimaryColumn()
    uuid: string;

    @Column()
    name: string;

    @Column()
    cost: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToMany(() => CardsUsers, cardsUsers => cardsUsers.card)
    cardsUsers: CardsUsers[];
}