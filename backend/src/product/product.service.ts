import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){
        
    }

    async findProducts() {
        let products = await this.productRepository.find();

        for(let product of products){
            delete product.payment_priceId;
        }

        return products;
    }

    async findProduct(productId: number) {
        let product = await this.productRepository.findOne({
            where: {
                id: productId
            }
        });

        if(!product)
            throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);

        delete product.payment_priceId;

        return product;
    }
}
