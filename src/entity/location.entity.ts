import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@Entity()
export class LocationEntity extends DefaultEntity {
  @IsNotEmpty()
  @Column()
  name: String;

  @IsNotEmpty()
  @Column()
  code: String;

  @IsNotEmpty()
  @Column()
  address: String;

  @IsNotEmpty()
  @Column()
  distance: number;

  @IsNotEmpty()
  @Column()
  describe: String;

  @IsNotEmpty()
  @Column()
  image: String;

  @IsNotEmpty()
  @Column()
  status: String;
}
