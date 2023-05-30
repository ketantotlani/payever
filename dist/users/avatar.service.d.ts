import { AvatarRepository } from './avatar.repository';
export declare class AvatarService {
    private readonly avatarRepository;
    constructor(avatarRepository: AvatarRepository);
    getAvatarById(userId: string): Promise<any>;
    createAvatar({ id, hash, avatar }: {
        id: any;
        hash: any;
        avatar: any;
    }): Promise<any>;
    deleteUserAvatar(userId: string): Promise<any>;
}
