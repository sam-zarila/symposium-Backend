import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './authentication/entities/authentication.entity';

@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Online_db',
      entities: [Authentication],
      synchronize: true,
    }),
    
    AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
