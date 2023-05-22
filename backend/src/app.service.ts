import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { ExampleEntity } from './example/entities/example.entity';
import { User } from './users/entity/user.entity';
import { env } from './environment';
import { registrationCleanupRoutine } from './routines/registrationcleanup.routine';
import { encrypt } from './utils';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  registrationCleanupRoutine:any;
  registrationCleanupRoutineCleared:boolean = true;

  constructor(
    private userService:UsersService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ExampleEntity)
    private exampleEntityRepository: Repository<ExampleEntity>
  ){
    this.init();
  }

  async init(){
    this.registrationCleanupRoutine = setInterval(async () => {
      if(this.registrationCleanupRoutineCleared){
        this.registrationCleanupRoutineCleared = false;
        await registrationCleanupRoutine(this.userRepository);
        this.registrationCleanupRoutineCleared = true;
      }
    }, env.registrationCleanupRoutineFrequency);

    if(!env.production){
      await this.clearData();
      await this.addMockData();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  public async clearData(){
    console.log("======");
    console.log("Clearing database data...");

    let users = await this.userRepository.find();
    for(let user of users){
      await this.userRepository.remove(user);
    }

    console.log("Done clearing database.");
    console.log("======");
  }

  public async addMockData(){
    console.log("======");
    console.log("Adding mock data...");

    let user = new User();
    user.email = "admin@example.com";
    user.name = "admin";
    user.password = encrypt("admin");
    user.confirmDate = dayjs().unix();
    user.role = User.Role.ADMIN;
    user.currentCredits = 10;
    user = await this.userRepository.save(user);

    await this.userService.logActivity(user, "LOGIN", "");

    user = new User();
    user.email = "molipolo@example.com";
    user.name = "molipolo";
    user.password = encrypt("test");
    user.confirmDate = dayjs().unix();
    user.role = User.Role.NORMAL;
    user.currentCredits = 0;
    user = await this.userRepository.save(user);

    await this.userService.logActivity(user, "LOGIN", "", dayjs().subtract(1, "days"));
    await this.userService.logActivity(user, "LOGIN", "");

    user = new User();
    user.email = "hotborris@example.com";
    user.name = "hotborris";
    user.password = encrypt("test");
    user.confirmDate = dayjs().unix();
    user.role = User.Role.NORMAL;
    user.currentCredits = 0;
    user = await this.userRepository.save(user);

    await this.userService.logActivity(user, "LOGIN", "", dayjs().subtract(10, "days"));
    await this.userService.logActivity(user, "LOGIN", "", dayjs().subtract(2, "days"));
    await this.userService.logActivity(user, "LOGIN", "", dayjs().subtract(1, "days"));
    await this.userService.logActivity(user, "LOGIN", "");

    user = new User();
    user.email = "arturus69000@example.com";
    user.name = "arturus";
    user.password = encrypt("test");
    user.confirmDate = dayjs().unix();
    user.currentCredits = 0;
    user = await this.userRepository.save(user);

    console.log("Done adding mock data.");
    console.log("======");
  }
}
