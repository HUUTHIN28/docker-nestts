import { Module } from '@nestjs/common';
import { HomeStayController } from './home-stay.controller';
import { HomeStayService } from './home-stay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { homeStayEntity } from 'src/entity/homeStay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([homeStayEntity])],
  controllers: [HomeStayController],
  providers: [HomeStayService],
})
export class HomeStayModule {}
