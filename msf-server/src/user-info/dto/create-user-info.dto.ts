import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PreferredTime } from '../schemas/user-info.schema';

export class CreateUserInfoDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  deliveryAddress: string;

  @IsEnum(PreferredTime)
  preferredTime: PreferredTime;

  @IsOptional()
  specialInstructions?: string;
}
