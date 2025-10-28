import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

enum UserRole {
  Admin = 'admin',
  Employee = 'employee',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, ingresa un correo electrónico válido',
    ],
  })
  email: string;
  @Prop({
    required: true,
    type: Number,
    min: [8, 'The password must be bigger than 8 letter '],
  })
  password: string;

  @Prop({ require: true, default: true })
  status: boolean;

  @Prop({ default:'Employee', enum:UserRole, required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
