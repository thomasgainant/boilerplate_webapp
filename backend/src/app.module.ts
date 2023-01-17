import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleEntity } from './example/entities/example.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { env } from './environment';
import { User } from './users/entity/user.entity';
import { ExampleModule } from './example/example.module';
import { ExampleTwoEntity } from './example/entities/exampleTwo.entity';
import { ExampleThreeEntity } from './example/entities/exampleThree.entity';

@Module({
  imports: [
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
    TypeOrmModule.forFeature([ User, ExampleEntity, ExampleTwoEntity, ExampleThreeEntity ]),
    AuthModule,
    UsersModule,
    ExampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
