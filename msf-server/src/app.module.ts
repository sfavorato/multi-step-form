import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env['MONGODB_URL'], {
      user: 'root',
      pass: 'password',
    }),
    UserInfoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
