import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { CardsUsers } from ".";

@Entity('user')
export class User {
    @PrimaryColumn()
    uuid: string;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    coins: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToMany(() => CardsUsers, cardsUsers => cardsUsers.user, { eager: true })
    cardsUsers: CardsUsers[];
}