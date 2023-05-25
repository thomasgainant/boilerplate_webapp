import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/entity/user.entity';
import { Payment } from './entity/payment.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Payment, Product ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
