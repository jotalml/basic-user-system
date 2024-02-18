import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/entity/user';
import { PagedResponse } from 'src/models/dto/pagedResponse';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get() // Get user by ID
    @ApiQuery({name:'page', required:false})
    @ApiQuery({name:'count', required:false})
    async getUsers(
        @Query('page')
        page: number = 1,
        @Query('count') count: number = 10
        ): Promise<PagedResponse> {
        return await this.userService.getAllUsers(Number(page), Number(count));
    }

    @Get(':id') // Get user by ID
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Post() // Add new user
    @UsePipes(ValidationPipe)
    async addNewUser(@Body() user: User): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Patch(':id') // Update user
    @UsePipes(ValidationPipe)
    async updateUser(
        @Param('id') id: number,
        @Body() user: User
        ): Promise<User> {
        return await this.userService.updateUser(id, user);
    }

    @Delete(':id') // Delete user by ID
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
    

    
}
