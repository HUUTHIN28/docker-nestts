import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class AuthEntity extends DefaultEntity {
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  role: string;
}
