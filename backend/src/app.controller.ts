import { Request, Controller, Get, Post, UseGuards, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/createUserDto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService:UsersService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    let newUser = await this.userService.create(createUserDto);
    if(newUser){
      delete newUser.id;
      delete newUser.password;
      delete newUser.confirmKey;
      return newUser;
    }
    throw new HttpException('Error in registration', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get('confirm/:name/:confirmKey')
  async confirm(@Param('name') name: string, @Param('confirmKey') confirmKey: string) {
    let user = await this.userService.confirm(name, confirmKey);
    if(user){
      delete user.id;
      delete user.password;
      return user;
    }
    throw new HttpException('Error in confirmation', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getProfile(@Request() req) {
    let user = await this.userService.findOne(req.user.name);
    return {
      name: user.name,
      email: user.email,
      credits: user.currentCredits
    };
  }
}
