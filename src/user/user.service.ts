import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/models/entity/pagedResponse';
import { User } from 'src/models/entity/user';
import { Repository } from 'typeorm';

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
            throw new BadRequestException(e.detail);
        }

    }

    async createUser(user: User): Promise<User> {
        try{
            return this.usersRepository.save(user);
        }catch(e){
            throw new BadRequestException(e.detail);
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
            throw new BadRequestException(e.detail);
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
                message: `user ${user.username} has been deleted`
            }
        }catch(e){
            throw new BadRequestException(e.detail);
        }
    }
}
