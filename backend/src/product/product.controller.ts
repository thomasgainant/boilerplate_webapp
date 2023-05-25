import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findProducts(){
        return await this.productService.findProducts();
    }

    @Get('/:productId')
    async findProduct(@Param('productId') productId: number){
        return await this.productService.findProduct(productId);
    }
}
