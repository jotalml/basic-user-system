import { IsEmail, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn() // Primary key in database (id)
  id: number;

  @Column() 
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column() 
  first_name: string;

  @Column() 
  last_name: string;

}