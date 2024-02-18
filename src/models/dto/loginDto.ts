import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class LoginDto{

  @ApiProperty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}