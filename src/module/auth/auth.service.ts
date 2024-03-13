import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'utils/contants';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private usersRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async GetAuthTest(): Promise<any> {
    const auth = await this.usersRepository.find();
    if (!auth) {
      throw new HttpException('err', HttpStatus.FOUND);
    }
    throw new HttpException({ data: auth }, HttpStatus.OK);
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
      throw new HttpException('email exist', HttpStatus.NOT_FOUND);
    }
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const payload = {
      email: data.email,
      password: hash,
      role: data.role,
    };

    const createAuth = await this.usersRepository.save(payload);
    if (!createAuth) {
      throw new HttpException('error', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('thành công', HttpStatus.OK);
  }

  async Login(data: { email: string; password: string }): Promise<any> {
    const checkEmail = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (!checkEmail) {
      throw new HttpException('email exist', HttpStatus.NOT_FOUND);
    }
    // const hash = await bcrypt.hash(data.password, saltOrRounds);
    const isMatch = await bcrypt.compare(checkEmail.password, data.password);
    const payload = {
      sub: checkEmail.id,
      username: checkEmail.email,
      role: checkEmail.role,
    };

    throw new HttpException(
      {
        status: 200,
        mes: 'Thành công',
        access_token: await this.jwtService.signAsync(payload),
      },
      HttpStatus.OK,
    );
  }
}
