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
import { User } from './users/entity/user.entity';
import { ExampleModule } from './example/example.module';
import { ExampleTwoEntity } from './example/entities/exampleTwo.entity';
import { ExampleThreeEntity } from './example/entities/exampleThree.entity';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

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
    TypeOrmModule.forFeature([ User, ExampleEntity, ExampleTwoEntity, ExampleThreeEntity ]),
    AuthModule,
    UsersModule,
    ExampleModule
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
