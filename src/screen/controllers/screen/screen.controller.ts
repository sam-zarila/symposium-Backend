import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScreenService } from 'src/screen/services/screen/screen.service';

@Controller('screen')
export class ScreenController {

    constructor(
        private readonly screenService: ScreenService,
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
     async getScreenPage(@Request() req){
         const userId = req.user.id;
         return this.screenService.getScreenData(userId);
     }
}
