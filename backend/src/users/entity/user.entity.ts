import * as crypto from 'crypto';
import { CryptedString, decrypt_symmetric, encrypt_symmetric } from "src/utils";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserActivity } from './user-activity.entity';
import { Payment } from 'src/payment/entity/payment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicKey: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
      nullable: true
  })
  confirmKey:string;
  @Column({
      type: "int"
  })
  confirmDate:number;

  @Column({
    type: "int",
    default: 0
  })
  role:User.Role;

  @OneToMany(() => UserActivity, (child) => child.parent, {
    cascade: true
  })
  activity:UserActivity[];

  @Column()
  private credits: string;
  public set currentCredits(value: number) {
    this.credits = encrypt_symmetric(''+value, this.publicKey).encryptedData;
  }
  public get currentCredits():number{
    return parseInt(decrypt_symmetric(new CryptedString(this.publicKey, this.credits)));
  }

  @OneToMany(() => Payment, (child) => child.parent, {
    cascade: true
  })
  payments:Payment[];

  constructor(){
    this.publicKey = crypto.randomBytes(8).toString('hex');
  }
}

export namespace User{
  export enum Role{
    UNCONFIRMED,
    NORMAL,
    ADMIN,
    BANNED
  }
}