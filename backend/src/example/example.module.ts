import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleEntity } from './entities/example.entity';
import { ExampleTwoEntity } from './entities/exampleTwo.entity';
import { ExampleThreeEntity } from './entities/exampleThree.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ExampleEntity, ExampleTwoEntity, ExampleThreeEntity ])
  ],
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class ExampleModule {}
