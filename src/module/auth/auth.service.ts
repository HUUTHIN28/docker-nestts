import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private usersRepository: Repository<AuthEntity>,
  ) {}

  async GetAuthTest(): Promise<any> {
    const auth = await this.usersRepository.find();
    if (!auth) {
      return {
        status: 400,
        mes: 'Thất bại ',
      };
    }
    return {
      status: 200,
      data: auth,
    };
  }

  async Register(data: {
    email: string;
    password: string;
    role: string;
  }): Promise<any> {
    const checkEmail = await this.usersRepository.findOneBy({
      email: data.email,
    });

    if (checkEmail) {
      return {
        status: 400,
        mes: 'email exist',
      };
    }

    const createAuth = await this.usersRepository.save(data);
    if (!createAuth) {
      return {
        mes: 'thất bại',
        code: 400,
      };
    }
    return {
      data: createAuth,
      mes: 'thành công',
      status: 200,
    };
  }
  async Login(data: { email: string; password: string }): Promise<any> {
    const checkEmail = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (!checkEmail) {
      return {
        status: 400,
        mes: 'email not exist',
      };
    }
    return {
      status: 200,
      mes: 'Thành công',
    };
  }
}
