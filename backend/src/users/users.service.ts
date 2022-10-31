import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    ){

    }

    async findOne(login: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                name: login
            }
        });
    }
}