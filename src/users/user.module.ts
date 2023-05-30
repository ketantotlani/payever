import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';
import { AvatarRepository } from './avatar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, AvatarRepository],
  exports: [UserService, UserRepository, AvatarRepository],
})
export class UserModule {}
