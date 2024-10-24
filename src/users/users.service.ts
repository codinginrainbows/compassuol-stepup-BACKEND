import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { User } from './models/users.model';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  public async findOneById(id: string): Promise<User> {
    const userExists = await this.usersModel.findById(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.usersModel.findById(id);
  }

  public async signup(signupDto: SignupDto): Promise<User> {
    const user = new this.usersModel(signupDto);

    const emailExists = await this.usersModel.findOne({
      email: signupDto.email,
    });

    const userExists = await this.usersModel.findOne({
      user: signupDto.user,
    });

    const birthdate = signupDto.birthdate

    if (new Date(birthdate) > new Date()) {
      throw new ForbiddenException('Birthdate must be less than today');
    }

    if (emailExists) {
      throw new ForbiddenException('Email already in use');
    }

    if (userExists) {
      throw new ForbiddenException('User already in use');
    }

    return user.save();
  }

  public async signin(
    signinDto: SigninDto,
  ): Promise<{ name: string; TokenJWT: string; user: string }> {
    const user = await this.findOneByUsername(signinDto.user);
    const match = await this.checkPassword(signinDto.password, user);

    if (!match) {
      throw new NotFoundException(
        'Invalid User or Password. Please, try again!',
      );
    }

    const TokenJWT = await this.authService.createAccessToken(user._id);

    return { name: user.name, TokenJWT, user: user.user };
  }

  public async update(id: string, updateUser: User): Promise<User> {
    return await this.usersModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateUser,
      },
      {
        new: true,
      },
    );
  }

  public async delete(id: string): Promise<User> {
    const userExists = await this.usersModel.findById(id);

    if (!userExists) {
      throw new NotFoundException('Usuário não existe');
    }

    return this.usersModel.findByIdAndDelete(id);
  }

  private async findOneByUsername(user: string): Promise<User> {
    const userExists = await this.usersModel.findOne({ user });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return userExists;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new NotFoundException(
        'Invalid User or Password. Please, try again!',
      );
    }

    return match;
  }
}
