import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserActivity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (parent) => parent.activity, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    parent: User;

    @Column()
    type:string;

    @Column()
    comment:string;

    @Column()
    createDate:number;
}