import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/entity/location.entity';
import { Repository } from 'typeorm';
import { typeLocation } from './type';
import { MessageError } from 'utils/contants';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}
  async getLocation(
    filter: Awaited<typeLocation> & { limit: number; page: number },
  ) {
    const location = await this.locationRepository.find({
      where: filter,
      select: {},
      take: filter.limit || 10,
      skip: filter.page || 0,
    });
    if (!location) {
      throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
    }
    const total = await this.getCount();
    throw new HttpException({ data: location, total: total }, HttpStatus.OK);
  }
  async addLocation(data: typeLocation) {
    const findCode = await this.locationRepository.findOneBy({
      code: data.code,
    });
    if (findCode) {
      throw new HttpException(
        `${MessageError.AlreadyExist} code`,
        HttpStatus.NOT_FOUND,
      );
    }

    const location = await this.locationRepository.save(data);
    if (!location) {
      throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
    }

    throw new HttpException('success', HttpStatus.OK);
  }

  async deleteLocation(id: number) {
    const findLocation = await this.locationRepository.findOneBy({ id });

    if (!findLocation) {
      throw new HttpException(MessageError.DoesNotExist, HttpStatus.NOT_FOUND);
    }

    const location = await this.locationRepository.delete({ id });
    if (!location) {
      throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
    }
    throw new HttpException('success', HttpStatus.OK);
  }

  async updateLocation(id: number, data: Awaited<typeLocation>) {
    const findLocation = await this.locationRepository.findOneBy({ id });

    if (!findLocation) {
      throw new HttpException(MessageError.DoesNotExist, HttpStatus.NOT_FOUND);
    }

    const location = await this.locationRepository.update(id, data);
    if (!location) {
      throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
    }
    throw new HttpException('success', HttpStatus.OK);
  }
  async getCount() {
    const count = await this.locationRepository.count();
    return count;
  }
}
