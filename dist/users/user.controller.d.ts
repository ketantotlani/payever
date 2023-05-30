import { CreateUserDto } from './dto/create.user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUserAvatar(id: string): Promise<User>;
    getUser(id: string): Promise<Response>;
    deleteAvatar(id: string): Promise<Response>;
}
