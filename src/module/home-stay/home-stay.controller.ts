import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeStayService } from './home-stay.service';
import { typeHomeStay } from './type';

@Controller('home-stay')
export class HomeStayController {
  constructor(private homeStayService: HomeStayService) {}

  @Get()
  getHomeStay(@Query() filter: any) {
    const homeStays = this.homeStayService.get(filter);
    return homeStays;
  }

  @Post()
  PostHomeStay(@Body() data: typeHomeStay) {
    const add = this.homeStayService.post(data);
    return add;
  }

  @Put(':id')
  update(@Param() { id }: { id: number }, @Body() data: Awaited<typeHomeStay>) {
    const update = this.homeStayService.update(id, data);
    return update;
  }

  @Delete(':id')
  delete(@Param() { id }: { id: number }) {
    const deleteHomeStay = this.homeStayService.delete(id);
    return deleteHomeStay;
  }
}
