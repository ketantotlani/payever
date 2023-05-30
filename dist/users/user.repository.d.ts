import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(userFilterQuery: FilterQuery<User>): Promise<User>;
    find(userFilterQuery: FilterQuery<User>): Promise<User[]>;
    createUser(user: User): Promise<User>;
    findOneAndRemove(userFilterQuery: FilterQuery<User>): Promise<User>;
}
