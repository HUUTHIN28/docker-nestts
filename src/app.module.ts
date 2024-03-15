import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { DataSource } from 'typeorm';
import { DatabaseProviders } from 'database/database.providers';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/contants';
import { RolesGuard } from './middleware/guards';
import { APP_GUARD } from '@nestjs/core';
import { LocationModule } from './module/location/location.module';
import { HomeStayModule } from './module/home-stay/home-stay.module';
@Module({
  imports: [
    DatabaseProviders,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    LocationModule,
    HomeStayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
