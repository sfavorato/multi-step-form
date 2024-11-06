import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserInfo } from './schemas/user-info.schema';

export interface UserInfoRepository {
  create(createUserInfoDto: CreateUserInfoDto): Promise<UserInfo>;
}

export const UserInfoRepository = Symbol('UserInfoRepository');
