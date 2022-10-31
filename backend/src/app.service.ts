import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Example } from './entity/example.entity';
import { User } from './users/entity/user.entity';
import { env } from './environment';
import { registrationCleanupRoutine } from './routines/registrationcleanup.routine';
import { encrypt } from './utils';

@Injectable()
export class AppService {
  registrationCleanupRoutine:any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>
  ){
    this.registrationCleanupRoutine = setInterval(() => { registrationCleanupRoutine(userRepository); }, env.registrationCleanupRoutineFrequency);

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
    user.email = "admin@example.com";
    user.name = "admin";
    user.password = encrypt("admin");
    user.confirmDate = dayjs().unix();
    await this.userRepository.save(user);
  }
}
