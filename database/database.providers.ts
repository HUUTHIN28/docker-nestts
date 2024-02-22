import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseProviders = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3301,
  username: 'dbuser',
  password: 'changeme',
  database: 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
