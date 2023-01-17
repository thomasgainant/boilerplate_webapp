import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExampleEntity } from "./example.entity";

@Entity()
export class ExampleThreeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ExampleEntity, (parent) => parent.children, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  parent: ExampleEntity;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;
}