import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { User } from 'src/users/entity/user.entity';
import { UserActivity } from 'src/users/entity/user-activity.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { Product } from 'src/product/entity/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ User, UserActivity, Payment, Product ])
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {}
