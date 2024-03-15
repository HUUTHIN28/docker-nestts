import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/entity/location.entity';
import { Like, Repository } from 'typeorm';
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
    const name = filter.name || '';
    const location = await this.locationRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      // select: ['name'],

      take: filter.limit,
      skip: filter.page * filter.limit,
    });
    if (!location) {
      throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
    }
    const total = await this.getCount();
    throw new HttpException({ data: location, total: total }, HttpStatus.OK);
  }

  async detailLocation(id: number) {
    try {
      const location = await this.locationRepository.findOneBy({ id });
      if (!location) {
        throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
      }
      return { data: location, status: HttpStatus.OK };
    } catch (err) {
      console.log('err', err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
