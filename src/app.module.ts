import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';

@Module({
  // !connection to mongoDB
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://itsketant:Isaacasimov1.@nodeexpressprojects.leaag.mongodb.net/test?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
