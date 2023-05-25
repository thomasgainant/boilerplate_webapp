import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column({
        nullable: true
    })
    description:string;

    @Column({
        type: "float"
    })
    price:number;

    @Column()
    payment_priceId:string;
}