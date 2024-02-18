import { Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/models/dto/loginDto';
import { Token } from 'src/models/dto/token';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login') //User Login endpoint
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({type: Token})
    async login(@Body() login: LoginDto):Promise<Token> {
        return await this.authService.validateUser(login);

  }
}
