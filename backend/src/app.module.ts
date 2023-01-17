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
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ User, ExampleEntity ]),
    AuthModule,
    UsersModule,
    ExampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
