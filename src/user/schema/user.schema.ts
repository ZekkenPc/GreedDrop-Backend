import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

enum UserRole {
  Admin = 'admin',
  Employee = 'empleado',
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
    type: String,
    minlength: [8, 'The password must be bigger than 8 letter'],
  })
  password: string;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({ default: 'empleado', enum: UserRole, required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
