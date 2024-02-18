import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/models/dto/loginDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Token } from 'src/models/dto/token';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService){}

    async validateUser(login: LoginDto): Promise<Token> {
        try{
            const existingUser = await this.userService.getUserByEmailOrUsername(login.username);
        
            if(!existingUser) throw new BadRequestException(`Username: ${login.username} doesn't exist`);

            const passwordIsValid = await bcrypt.compare(login.password, existingUser.password);

            if(!passwordIsValid) throw new BadRequestException(`Invalid Password`);
            
            //The payload is the data that will be included in the JWT token.
            const payload = { username: existingUser.username, id: existingUser.id };

            //a secret key is defined that can be in an environment variable and ussually is sended in headers request and the duration of the session
            const options = { 
                secret: 'secret-key',
                expiresIn: '1h' 
            };
        
            const token = new Token();
            token.token = this.jwtService.sign(payload,options);

            //JWT token returns upon successful login
            return token;

        }catch(e){
            throw new BadRequestException(e.message || e.detail);
        }
    }
}
