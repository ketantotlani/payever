import { Body, Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.first_name,
      createUserDto.last_name,
      createUserDto.avatar,
    );
  }

  @Get('user/:id/avatar')
  async getUserAvatar(@Param('id') id: string): Promise<User> {
    return this.userService.getUserAvatar(id);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<Response> {
    return this.userService.getUserById(id);
  }

  @Delete('user/:id/avatar')
  async deleteAvatar(@Param('id') id: string): Promise<Response> {
    return this.userService.deleteUserAvatar(id);
  }
}
