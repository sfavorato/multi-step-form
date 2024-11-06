import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const PreferredTime = {
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
} as const;

export type PreferredTime = (typeof PreferredTime)[keyof typeof PreferredTime];

export type UserInfoDocument = HydratedDocument<UserInfo>;

@Schema({ timestamps: true })
export class UserInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({
    required: true,
    enum: Object.values(PreferredTime),
  })
  preferredTime: PreferredTime;

  @Prop()
  specialInstructions?: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
