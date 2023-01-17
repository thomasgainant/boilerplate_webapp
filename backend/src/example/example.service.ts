import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { ExampleEntity } from './entities/example.entity';
import { ExampleThreeEntity } from './entities/exampleThree.entity';
import { ExampleTwoEntity } from './entities/exampleTwo.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleEntity)
    private exampleEntityRepository: Repository<ExampleEntity>,
    @InjectRepository(ExampleTwoEntity)
    private exampleTwoEntityRepository: Repository<ExampleTwoEntity>,
    @InjectRepository(ExampleThreeEntity)
    private exampleThreeEntityRepository: Repository<ExampleThreeEntity>
  ){

  }

  async create(createExampleDto: CreateExampleDto) {
    let exampleEntity = new ExampleEntity();
    exampleEntity.name = createExampleDto.name;
    exampleEntity.description = createExampleDto.description;
    if(createExampleDto.bound){
      let bound = await this.exampleTwoEntityRepository.findOne({
        where: {
          id: createExampleDto.bound.id
        }
      });

      if(!bound){
        bound = await this.exampleTwoEntityRepository.save(createExampleDto.bound);
      }
      exampleEntity.bound = bound;
    }
    return await this.exampleEntityRepository.save(exampleEntity);
  }

  async findAll() {
    return await this.exampleEntityRepository.find({
      relations: [ "bound", "children" ]
    });
  }

  async findOne(id: string) {
    return await this.exampleEntityRepository.findOne({
      where: {
        id: id
      },
      relations: [ "bound", "children" ]
    });
  }

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    let exampleEntity = await this.exampleEntityRepository.findOne({
      where: {
        id: id
      }
    });

    if(exampleEntity){
      exampleEntity.name = updateExampleDto.name;
      exampleEntity.description = updateExampleDto.description;
      if(updateExampleDto.bound){
        let bound = await this.exampleTwoEntityRepository.findOne({
          where: {
            id: updateExampleDto.bound.id
          }
        });

        if(!bound){
          bound = await this.exampleTwoEntityRepository.save(updateExampleDto.bound);
        }
        exampleEntity.bound = bound;
      }
      return await this.exampleEntityRepository.save(exampleEntity);
    }
    throw new HttpException('Entity not found.', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    let exampleEntity = await this.exampleEntityRepository.findOne({
      where: {
        id: id
      }
    });

    if(exampleEntity){
      return await this.exampleEntityRepository.remove(exampleEntity);
    }
    throw new HttpException('Entity not found.', HttpStatus.NOT_FOUND);
  }
}
