import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './Entities/UserEntity';
import { Organization } from './Entities/OrganisationEntity';
import { ScreenModule } from './screen/screen.module';


@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Online_db',
      entities: [User, Organization],
      synchronize: false,
    }),
    AuthModule,
    ScreenModule,
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
