import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserInfoDto);
  }
}
