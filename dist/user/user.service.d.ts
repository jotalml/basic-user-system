import { PagedResponse } from 'src/models/entity/pagedResponse';
import { User } from 'src/models/entity/user';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getAllUsers(page: number, count: number): Promise<PagedResponse>;
    getUserById(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    getUserByEmailOrUsername(username: string): Promise<User>;
}
