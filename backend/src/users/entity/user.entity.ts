import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}