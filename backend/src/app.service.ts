import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './data/example.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>
  ){
    
  }

  getHello(): string {
    return 'Hello World!';
  }
}
