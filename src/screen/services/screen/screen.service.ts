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
            organizationName:user?.organization?.name,
            role:user?.role,
            service: this.getAvailableServices(user.role),

            
        };
         }

         private getAvailableServices(role: string) {
            const services = {
              hr: ['Performance Evaluation'],
              accountant: ['Expenditure Analysis', 'Budget Prediction'],
              admin: ['Real-Time Financial Monitoring', 'Performance Evaluation', 'Budget Prediction'],
            };
        
            return services[role] || [];
          }
    
}
