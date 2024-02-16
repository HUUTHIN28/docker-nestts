import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('auth')
  checkAuth() {
    return 'checkAuth';
  }

  @Post()
  async Login(@Body() data: { email: string; password: string }) {}

  @Post('register')
  async Register(
    @Body() data: { email: string; password: string; role: string },
  ) {
    const auth = this.authService.Register(data);
    return auth;
  }

  @Post()
  async Forget(@Body() data: { old: string; new: string }) {}
}
