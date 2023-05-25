import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleEntity } from './example/entities/example.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { env } from './environment';

import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';

import { User } from './users/entity/user.entity';
import { UserActivity } from './users/entity/user-activity.entity';
import { Payment } from './payment/entity/payment.entity';
import { Product } from './product/entity/product.entity';
import { ExampleModule } from './example/example.module';
import { ExampleTwoEntity } from './example/entities/exampleTwo.entity';
import { ExampleThreeEntity } from './example/entities/exampleThree.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'admin', 'views', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: env.dbType,
      host: env.dbHost,
      port: env.dbPort,
      username: env.dbUsername,
      password: env.dbPassword,
      database: env.dbDatabase,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: env.production ? false : true,
    }),
    TypeOrmModule.forFeature([ User, UserActivity, Payment, Product, ExampleEntity, ExampleTwoEntity, ExampleThreeEntity ]),
    AuthModule,
    UsersModule,
    ExampleModule,
    AdminModule,
    PaymentModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
