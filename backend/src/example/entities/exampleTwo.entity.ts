import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExampleTwoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;
}