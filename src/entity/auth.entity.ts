import { Column, Entity } from "typeorm";
import { DefaultEntity } from './default.entity'

@Entity()
export class AuthEntity extends DefaultEntity {

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role:string
} 