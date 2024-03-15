import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Roles } from 'src/middleware/roles.decorator';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('auth')
  async checkAuth() {
    const authCache = await this.cacheManager.get('auth');
    if (authCache) {
      return authCache;
    }
    const auth = await this.authService.GetAuthTest();
    await this.cacheManager.set('auth', auth);
    return auth;
  }

  @Post('log-in')
  async Login(@Body() data: { email: string; password: string }) {
    const logIn = await this.authService.Login(data);
    return logIn;
  }

  @Post('register')
  async Register(
    @Body() data: { email: string; password: string; role: string },
  ) {
    const auth = this.authService.Register(data);
    return auth;
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: { refreshToken: string }) {
    const auth = await this.authService.refreshToken(data.refreshToken);
    return auth;
  }

  @Post()
  async Forget(@Body() data: { old: string; new: string }) {}
}
