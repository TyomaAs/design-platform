import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string | undefined }> {
    const user = await this.userService.getUser(email);
    if (!user) {
      console.log('User not found');
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const payload = { sub: user.id, username: user.firstName };
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (isPasswordValid) {
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    } else {
      console.log('Password incorrect');
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
  }

  async signup(
    email,
    firstName,
    lastName,
    password,
    avatarURL,
    role,
    phoneNumber,
  ) {
    const userEmail = await this.userService.getUser(email);
    if (userEmail) {
      throw new HttpException(
        'This user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser(
      email,
      firstName,
      password,
      avatarURL,
      role,
      phoneNumber,
    );
    return user; // comment
  }
  // async createAdmin() {
  //   return await this.userService.createAdmin();
  // }
}
