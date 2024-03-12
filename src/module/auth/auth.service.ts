import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
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

    const createAuth = await this.usersRepository.save(data);
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
    const payload = { sub: checkEmail.id, username: checkEmail.email };

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
