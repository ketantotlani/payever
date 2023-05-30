import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { Response } from 'express';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    private readonly avatarService;
    getUserById(res: Response, userId: string): Promise<Response>;
    getUserAvatar(res: Response, userId: string): Promise<User>;
    createUser(res: Response, email: string, first_name: string, last_name: string, avatar: string): Promise<any>;
    deleteUserAvatar(res: Response, userId: string): Promise<any>;
    private sendEmail;
    private sendRabbitEvent;
}
