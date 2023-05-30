import { HttpStatus, Injectable, Inject, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as amqp from 'amqplib';
import { AvatarRepository } from './avatar.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Inject(AvatarRepository)
  private readonly avatarRepository: AvatarRepository;

  // Service for getting user by UserId
  async getUserById(userId: string): Promise<any> {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    if (!response) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return response.data.data;
  }

  // Service for getting User Avatar by UserId and returning if already exists
  async getUserAvatar(userId: string): Promise<any> {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);

    const user = response.data.data;

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const avatarFilePath = path.join(
      __dirname,
      '..',
      'avatars',
      `${userId}.png`,
    );

    if (fs.existsSync(avatarFilePath)) {
      // Avatar file already exists, retrieve and returning its base64-encoded
      const avatarObject = await this.avatarRepository.findOne({ userId });
      return avatarObject ? avatarObject.avatar : null;
    } else {
      // Retrieve the avatar image from the provided URL
      const response = await axios.get(user.avatar, {
        responseType: 'arraybuffer',
      });

      const avatarBuffer = Buffer.from(response.data, 'binary');

      // Save the avatar as a plain file
      fs.writeFileSync(avatarFilePath, avatarBuffer);

      const avatarHash = uuidv4();
      const avatarBase64 = avatarBuffer.toString('base64');

      // Storing the avatar in db
      await this.avatarRepository.createAvatar({
        id: user.id,
        hash: avatarHash,
        avatar: avatarBase64,
      });
      return avatarBase64;
    }
  }

  // Service for creating user in DB
  async createUser(
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
  ): Promise<any> {
    const user = await this.userRepository.createUser({
      id: Date.now(),
      email,
      first_name,
      last_name,
      avatar,
    });

    // Sending an email (dummy implementation)
    const emailSent = await this.sendEmail(user.email);

    if (emailSent) {
      console.log('Email sent to:', user.email);
    } else {
      console.log('Failed to send email to:', user.email);
    }

    // Sending rabbit event (dummy implementation)
    const eventSent = await this.sendRabbitEvent(user.id);
    if (eventSent) {
      console.log('Rabbit event sent for user ID:', user.id);
    } else {
      console.log('Failed to send rabbit event for user ID:', user.id);
    }

    return HttpStatus.CREATED;
  }

  // Service for deleting User Avatar by UserId
  async deleteUserAvatar(userId: string): Promise<any> {
    const avatarFilePath = path.join(
      __dirname,
      '..',
      'avatars',
      `${Number(userId)}.png`,
    );

    if (fs.existsSync(avatarFilePath)) {
      // Remove the file from the File storage
      fs.unlinkSync(avatarFilePath);

      // Delete the avatar entry from db
      await this.avatarRepository.findOneAndRemove(new Number(userId));

      return HttpStatus.OK;
    } else {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  private async sendEmail(emailAddress: string): Promise<boolean> {
    // Create a nodemailer transport
    const transporter = nodemailer.createTransport({
      // Providing email sending configuration here
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: '<Email>',
        pass: '<Password>',
      },
    });

    // Defining the email message
    const mailOptions = {
      from: '<Email>',
      to: emailAddress,
      subject: 'Dummy Email',
      text: 'This is a dummy email.',
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async sendRabbitEvent(userId: number): Promise<boolean> {
    // Connect to the rabbitmq server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Define the exchange and queue names
    const exchange = 'dummy_exchange';
    const queue = 'dummy_queue';

    try {
      // Declare the exchange and queue
      await channel.assertExchange(exchange, 'fanout', { durable: false });
      await channel.assertQueue(queue, { durable: false });
      await channel.bindQueue(queue, exchange, '');

      // Event message definition
      const eventMessage = {
        userId: userId,
        message: 'Dummy Rabbit Event',
      };

      // Publish the event message
      await channel.publish(
        exchange,
        '',
        Buffer.from(JSON.stringify(eventMessage)),
      );

      return true;
    } catch (error) {
      console.error('Failed to send rabbit event:', error);
      return false;
    } finally {
      // Close the channel and connection
      await channel.close();
      await connection.close();
    }
  }
}
