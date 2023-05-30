import { FilterQuery, Model } from 'mongoose';
import { Avatar, AvatarDocument } from './schemas/avatar.schema';
export declare class AvatarRepository {
    private readonly avatarModel;
    constructor(avatarModel: Model<AvatarDocument>);
    findOne(userFilterQuery: FilterQuery<Avatar>): Promise<Avatar>;
    createAvatar(avatar: Avatar): Promise<Avatar>;
    findOneAndRemove(userFilterQuery: FilterQuery<Avatar>): Promise<Avatar>;
}
