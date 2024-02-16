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
  async Register(data: {
    email: string;
    password: string;
    role: string;
  }): Promise<any> {
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
}
