import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserInfoRepository } from './user-info.interface';

@Injectable()
export class UserInfoService {
  constructor(
    @Inject(UserInfoRepository)
    private readonly userInfoRepository: UserInfoRepository,
  ) {}

  create(createUserInfoDto: CreateUserInfoDto) {
    return this.userInfoRepository.create(createUserInfoDto);
  }
}
