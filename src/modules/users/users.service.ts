import { NotFoundError } from './../../errors/NotFoundError';
import { AlreadyExistsError } from './../../errors/AlreadyExistsError';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userModel.findOne({ email: createUserDto.email })) {
      throw new AlreadyExistsError('E-mail already exists');
    }
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    await user.delete();
  }
}
