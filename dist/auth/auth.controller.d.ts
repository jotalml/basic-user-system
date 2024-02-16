import { AuthService } from './auth.service';
import { Login } from 'src/models/entity/login';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(login: Login): Promise<string>;
}
