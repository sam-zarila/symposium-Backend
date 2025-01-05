import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./OrganisationEntity";

@Entity()

export class User{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    email: string;
    
    @ApiProperty()
    @Column()
    password: string;

    @ManyToOne(() => Organization, (organisation) => organisation.users )
    organization:Organization;


}