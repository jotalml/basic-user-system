import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entity/user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //config connection params in environment varibales 
    TypeOrmModule.forRoot({ // Configuring TypeORM with database connections params
      type: 'postgres', //database type 
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database:  process.env.DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
