import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { Organization } from 'src/Entities/OrganisationEntity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Organization])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
