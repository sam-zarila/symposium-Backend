import { Module } from '@nestjs/common';
import { ScreenController } from './controllers/screen/screen.controller';
import { ScreenService } from './services/screen/screen.service';

@Module({
  controllers: [ScreenController],
  providers: [ScreenService]
})
export class ScreenModule {}
