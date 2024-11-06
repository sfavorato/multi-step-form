import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoUserInfoRepository } from './mongo/mongo-user-info.repository';
import { UserInfo, UserInfoSchema } from './schemas/user-info.schema';
import { UserInfoController } from './user-info.controller';
import { UserInfoRepository } from './user-info.interface';
import { UserInfoService } from './user-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInfo.name, schema: UserInfoSchema },
    ]),
  ],
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    { provide: UserInfoRepository, useClass: MongoUserInfoRepository },
  ],
})
export class UserInfoModule {}
