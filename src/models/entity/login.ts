import { MinLength } from 'class-validator';

export class Login{
  username: string;

  @MinLength(8)
  password: string;
}