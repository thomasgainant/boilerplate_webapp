import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Example } from './data/example.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "test",
      password: "test",
      database: "test",
      entities: [ Example ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ Example ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
