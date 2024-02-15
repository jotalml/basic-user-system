import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn() // Primary key in database (id)
  id: number;

  @Column() 
  username: string;

  @Column() 
  email: string;

  @Column() 
  password: string;

  @Column() 
  first_name: string;

  @Column() 
  last_name: string;

}