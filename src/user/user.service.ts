import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUserDto) {
    const newUser = new this.userModel(createUser);
    return await newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUser: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
