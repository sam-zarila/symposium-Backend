import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from 'src/DTOs/register';
import { LoginDto } from 'src/DTOs/loginDTO';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      // Handle errors appropriately
      return {
        status: 'error',
        message: error.message || 'An error occurred during registration.',
      };
    }
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      // Handle errors appropriately
      return {
        status: 'error',
        message: error.message || 'An error occurred during login.',
      };
    }
  }
}
