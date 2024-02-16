import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/models/entity/pagedResponse';
import { User } from 'src/models/entity/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    
      async getAllUsers(page: number, count: number): Promise<PagedResponse> {
        const totalElements = await this.usersRepository.count({
            take: count,
            skip: count * (page - 1)
        });
        
        const result = await this.usersRepository.find({
            take: count,
            skip: count * (page - 1)
        });

        if(count>result.length) count = result.length;

        if(!(result.length>0)) throw new BadRequestException('No Users Found');

        const totalPages = Math.ceil(totalElements / count);

        const pagedResponse =  new PagedResponse();
        pagedResponse.page = page;
        pagedResponse.count = count;
        pagedResponse.totalElements = totalElements;
        pagedResponse.totalPages = totalPages;
        pagedResponse.content = result;


        return pagedResponse;
    }

    async getUserById(id: number): Promise<User> {
        try{
            const user = await this.usersRepository.findOneBy({id: id});
            if(!user){
                throw new NotFoundException('User not found');
            }
            return user;
        }catch(e){
            throw new BadRequestException(e.detail || e.message);
        }

    }

    async createUser(user: User): Promise<User> {
        try{
            const emailExist = await this.usersRepository.existsBy({email:user.email});
            const usernameExist = await this.usersRepository.existsBy({username:user.username});
                if(emailExist || usernameExist) throw new BadRequestException('User exist');
                if(!(user.password.length > 8)) throw new BadRequestException('Your password must be more than 8 characters');

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(user.password, salt);
            user.password = hashPassword;

            return this.usersRepository.save(user);
        }catch(e){
            throw new BadRequestException(e.detail || e.message);
        }
        
    }

    async updateUser(id: number, user: User): Promise<User> {
        try{
            const updatedUser = await this.usersRepository.findOneBy({id: id});
            if(!updatedUser){
                throw new NotFoundException('User not found');
            }
        
            await this.usersRepository.update(id, user);

            return await this.usersRepository.findOneBy({id: id});
        }catch(e){
            throw new BadRequestException(e.detail || e.message);
        }

    }

    async deleteUser(id: number) {
        try{
            const user = await this.usersRepository.findOneBy({id: id});
            if(!user){
                throw new NotFoundException('User not found');
            }

            this.usersRepository.delete({id: id});

            return {
                message: `User ${user.username} has been deleted`
            }
        }catch(e){
            throw new BadRequestException(e.detail || e.message);
        }
    }

    async getUserByEmailOrUsername(username: string): Promise<User> {
        const user = await this.usersRepository.createQueryBuilder('user')
            .where({username: username})
            .orWhere({email: username})
            .getOne();

        return user;
    }
    
}
