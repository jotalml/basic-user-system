import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto{
  
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @MinLength(8)
    password: string;
  
    @ApiProperty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsString() 
    lastName: string;
  
  }