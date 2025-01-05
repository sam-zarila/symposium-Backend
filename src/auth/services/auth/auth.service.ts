import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/Entities/OrganisationEntity';
import { User } from 'src/Entities/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) userRepository:Repository<User>,
        @InjectRepository(Organization) organisationRepository:Repository<Organization>
    ){}
}
