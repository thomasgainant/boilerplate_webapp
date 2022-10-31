import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './data/example.entity';
import { User } from './data/user.entity';
import { env } from './environment';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>
  ){
    if(!env.production){
      this.clearData();
      this.addMockData();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  public async clearData(){
    let users = await this.userRepository.find();
    for(let user of users){
      await this.userRepository.remove(user);
    }
  }

  public async addMockData(){
    let user = new User();
    user.name = "admin";
    user.password = "admin";
    await this.userRepository.save(user);
  }
}
