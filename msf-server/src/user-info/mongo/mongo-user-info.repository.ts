import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInfoDto } from '../dto/create-user-info.dto';
import { UserInfo } from '../schemas/user-info.schema';
import { UserInfoRepository } from '../user-info.interface';

export class MongoUserInfoRepository implements UserInfoRepository {
  constructor(
    @InjectModel(UserInfo.name) private readonly model: Model<UserInfo>,
  ) {}

  async create(createUserInfoDto: CreateUserInfoDto): Promise<UserInfo> {
    const userInfo = new this.model(createUserInfoDto);
    const result = await userInfo.save();
    return result.toObject();
  }
}
