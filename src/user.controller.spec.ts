/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserRepository } from './users/user.repository';
import { User, UserSchema } from './users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './users/schemas/avatar.schema';
import { AvatarRepository } from './users/avatar.repository';
import { HttpStatusCode } from 'axios';
import * as fs from 'fs';

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
  unlinkSync: jest.fn()
}));

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        AvatarRepository,
        { provide: 'FS', useValue: fs },
      ],
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://itsketant:Isaacasimov1.@nodeexpressprojects.leaag.mongodb.net/test?retryWrites=true&w=majority',
        ), // Add your MongoDB connection URI
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Avatar.name, schema: AvatarSchema },
        ]), // Add the UserSchema to MongooseModule
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  jest.setTimeout(100000000);

  function isBase64(value) {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(value);
  }

  describe('getUser', () => {
    it('should get a user by id', async () => {
      // Calling Api to get User Data from a third party website
      const resMain = await controller.getUser('2');

      console.log(resMain);
      expect(resMain).toHaveProperty('email');
    });
  });

  describe('get&deleteUserAvatar', () => {
    it('should get user avatar by id', async () => {
      // Calling Api to get User Avatar in BASE64
      const resMain = await controller.getUserAvatar('2');

      // Cheking if Returned value is BASE64
      const result = isBase64(resMain);

      expect(result).toBe(true);
    });

    it('should delete user avatar by id', async () => {
      // Calling Api to get User Avatar in BASE64
      const resMain = await controller.deleteAvatar('2');
      console.log('resMain', resMain);
      expect(resMain).toBe(HttpStatusCode.Ok);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const email = Math.random().toString(36).substring(2, 8);
      // Creating a DummyUserDto
      const createUserDto = {
        email: `${email}@${email}.com`,
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'avatar.jpg',
      };

      // Calling Api for Creation of a new User
      const resMain = await controller.createUser(createUserDto);

      expect(resMain).toBe(HttpStatusCode.Created);
    });
  });
});
