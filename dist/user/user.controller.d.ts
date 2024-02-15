import { UserService } from './user.service';
import { User } from 'src/models/entity/user';
import { PagedResponse } from 'src/models/entity/pagedResponse';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(page?: number, count?: number): Promise<PagedResponse>;
    getUserById(id: number): Promise<User>;
    addNewUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
