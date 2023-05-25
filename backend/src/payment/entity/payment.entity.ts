import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";
import { Product } from "../../product/entity/product.entity";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (parent) => parent.payments, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    parent: User;

    @ManyToOne(() => Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    product: Product;

    @Column({
        type: "float"
    })
    amount:number;

    @Column()
    createDate:number;

    @Column({
        nullable: true
    })
    payment_sessionId:string;

    @Column({
        type: "int",
        default: 0
    })
    status:Payment.Status;
}

export namespace Payment{
    export enum Status{
        CREATED,
        AWAITING,
        PAID,
        FAILED
    }
  }