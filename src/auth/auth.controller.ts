import { Body, Controller, Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from 'src/models/dto/loginDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('login') //User Login endpoint
    async login(@Body() login: Login) {
        return await this.authService.validateUser(login);
  }
}
