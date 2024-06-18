import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema } from './schemas/login.schema';
import { SignUpSchema } from './schemas/signup.schema';
import { AuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') async login(@Body() input: LoginSchema) {
    return this.authService.login(input.email, input.password);
  }

  @Post('signup') async signup(@Body() input: SignUpSchema) {
    return this.authService.signup(
      input.email,
      input.firstName,
      input.lastName,
      input.password,
      input.avatarURL,
      input.role,
      input.phoneNumber,
      input.country,
      input.age,
    );
  }

  @UseGuards(AuthGuard)
  @Post('test')
  async test() {
    return 'test';
  }
}
