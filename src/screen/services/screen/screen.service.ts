import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ScreenService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){ }

    async getScreenData(userId:number){
        const user = await this.userRepository.findOne({where:{id:userId}});

        return {
            organizationName:user?.organization?.name
            
        }

    }
    
}
