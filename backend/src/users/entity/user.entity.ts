import * as crypto from 'crypto';
import { CryptedString, decrypt_symmetric, encrypt_symmetric } from "src/utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  private credits: string;
  public set currentCredits(value: number) {
    this.credits = encrypt_symmetric(''+value, this.publicKey).encryptedData;
  }
  public get currentCredits():number{
    return parseInt(decrypt_symmetric(new CryptedString(this.publicKey, this.credits)));
  }

  constructor(){
    this.publicKey = crypto.randomBytes(8).toString('hex');
  }
}