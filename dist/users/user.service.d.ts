import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    private readonly avatarRepository;
    getUserById(userId: string): Promise<any>;
    getUserAvatar(userId: string): Promise<any>;
    createUser(email: string, first_name: string, last_name: string, avatar: string): Promise<any>;
    deleteUserAvatar(userId: string): Promise<any>;
    private sendEmail;
    private sendRabbitEvent;
}
