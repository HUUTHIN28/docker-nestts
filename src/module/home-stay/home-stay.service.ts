import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { homeStayEntity } from 'src/entity/homeStay.entity';
import { Like, Repository } from 'typeorm';
import { typeHomeStay } from './type';
import { MessageError } from 'utils/contants';

@Injectable()
export class HomeStayService {
  constructor(
    @InjectRepository(homeStayEntity)
    private homeStayRepository: Repository<homeStayEntity>,
  ) {}

  async count() {
    const homeStay = await this.homeStayRepository.count();
    return homeStay;
  }

  async get(filter: Awaited<typeHomeStay> & { limit: number; page: number }) {
    try {
      const name = filter.name || '';
      const homeStays = await this.homeStayRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
        take: filter.limit || 10,
        skip: filter.page * filter.limit || 0,
      });
      if (!homeStays) {
        throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
      }
      const total = await this.count();
      const data = {
        data: homeStays,
        total: total,
      };
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async post(data: typeHomeStay) {
    try {
      const check = await this.homeStayRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        throw new HttpException(
          `${MessageError.AlreadyExist} code`,
          HttpStatus.NOT_FOUND,
        );
      }
      const add = await this.homeStayRepository.save(data);
      if (!add) {
        throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('success', HttpStatus.OK);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(id: number, data: Awaited<typeHomeStay>) {
    try {
      const check = await this.homeStayRepository.findOneBy({ id });
      if (!check) {
        throw new HttpException(
          MessageError.DoesNotExist,
          HttpStatus.NOT_FOUND,
        );
      }
      const update = await this.homeStayRepository.update(id, data);
      if (!update) {
        throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('success', HttpStatus.OK);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delete(id: number) {
    try {
      const check = await this.homeStayRepository.findOneBy({ id });
      if (!check) {
        throw new HttpException(
          MessageError.DoesNotExist,
          HttpStatus.NOT_FOUND,
        );
      }
      const deleteHomeStay = await this.homeStayRepository.delete(id);
      if (!deleteHomeStay) {
        throw new HttpException(MessageError.NotFound, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('success', HttpStatus.OK);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
