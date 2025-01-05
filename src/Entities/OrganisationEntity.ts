
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class Organization{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @OneToMany(() => User, (user) => user.organization)
    users: User[];

}