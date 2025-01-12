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

    @ApiProperty({
        description: "Role of the user (e.g., Admin, HR, Accountant)",
        example: "Admin",
      })
      @Column({ type: "enum", enum: ["Admin", "HR", "Accountant"], default: "Admin" })
      role: "Admin" | "HR" | "Accountant";

    @ManyToOne(() => Organization, (organisation) => organisation.users )
    organization:Organization;


}