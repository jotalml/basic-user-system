import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User{

  @ApiProperty()
  @PrimaryGeneratedColumn() // Primary key in database (id)
  @IsNumber()
  id: number;

  @ApiProperty()
  @Column() 
  username: string;

  @ApiProperty()
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @Column({
    name: 'first_name'
  })
  @IsString()
  firstName: string;

  @ApiProperty()
  @Column({
    name: 'last_name'
  })
  @IsString() 
  lastName: string;

}