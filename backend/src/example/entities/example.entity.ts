import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExampleThreeEntity } from "./exampleThree.entity";
import { ExampleTwoEntity } from "./exampleTwo.entity";

@Entity()
export class ExampleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => ExampleTwoEntity, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public bound:ExampleTwoEntity;

  @OneToMany(() => ExampleThreeEntity, (child) => child.parent, {
    cascade: true
  })
  children:ExampleThreeEntity[];

  @Column({ default: true })
  active: boolean;
}