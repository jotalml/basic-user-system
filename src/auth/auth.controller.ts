import { Body, Controller, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from 'src/models/entity/login';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get('login') //User Login endpoint
    async login(@Body() login: Login) {
        return await this.authService.validateUser(login);
  }
}
