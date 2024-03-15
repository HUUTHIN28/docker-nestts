import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/middleware/roles.decorator';
import { LocationService } from './location.service';
import { RolesGuard } from 'src/middleware/guards';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('')
  @Roles(['user'])
  @UseGuards(RolesGuard)
  async getLocation(@Query() filter: any) {
    const locations = await this.locationService.getLocation(filter);
    return locations;
  }

  @Get(':id')
  async detail(@Param() { id }: { id: number }) {
    const location = await this.locationService.detailLocation(id);
    return location;
  }

  @Post('')
  async addLocation(@Body() data: any) {
    const location = await this.locationService.addLocation(data);
    return location;
  }

  @Delete(':id')
  async deleteLocation(@Param() param: { id: number }) {
    const { id } = param;
    const location = await this.locationService.deleteLocation(id);
    return location;
  }

  @Put(':id')
  async updateLocation(@Param() param: { id: number }, @Body() data: any) {
    const { id } = param;
    const location = await this.locationService.updateLocation(id, data);
    return location;
  }
}
