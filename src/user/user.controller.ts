import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/entity/user';
import { PagedResponse } from 'src/models/dto/pagedResponse';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiDefaultResponse, ApiOkResponse, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from 'src/models/dto/registerDto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get() // Get All users by filter
    @ApiOkResponse({type: PagedResponse})
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
    @ApiOkResponse({type: User})
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Post() // Add new user
    @ApiCreatedResponse({type: User})
    @UsePipes(ValidationPipe)
    async addNewUser(@Body() user: RegisterDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Patch(':id') // Update user
    @ApiOkResponse({type: User})
    @UsePipes(ValidationPipe)
    async updateUser(
        @Param('id') id: number,
        @Body() user: RegisterDto
        ): Promise<User> {
        return await this.userService.updateUser(id, user);
    }

    @Delete(':id') // Delete user by ID
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
    

    
}
