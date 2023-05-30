import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Avatar, AvatarDocument } from './schemas/avatar.schema';

@Injectable()
export class AvatarRepository {
  constructor(
    @InjectModel(Avatar.name)
    private readonly avatarModel: Model<AvatarDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<Avatar>): Promise<Avatar> {
    return this.avatarModel.findOne(userFilterQuery);
  }

  async createAvatar(avatar: Avatar): Promise<Avatar> {
    const newUser = new this.avatarModel(avatar);
    return newUser.save();
  }

  async findOneAndRemove(
    userFilterQuery: FilterQuery<Avatar>,
  ): Promise<Avatar> {
    return await this.avatarModel.findOneAndRemove(userFilterQuery);
  }
}
