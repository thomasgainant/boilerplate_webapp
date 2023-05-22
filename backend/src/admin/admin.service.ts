import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from 'src/users/entity/user-activity.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserActivity)
        private userActivityRepository: Repository<UserActivity>
    ){

    }

    async getDailyActiveUsersForLastMonth():Promise<{ [date: number]: number; }[]>{
        let result = [];

        let day = dayjs();
        for(let i = 0; i < 30; i++){
            result.push({
                date: day.unix(),
                value: await this.getDailyUniqueUsersForDay(day)
            });
            day = day.subtract(1, 'day');
        }

        result = result.reverse();

        return result;
    }

    async getDailyUniqueUsersForDay(date:dayjs.Dayjs){
        let startOfDay = date.clone().set('hours', 0).set('minutes', 0).set('seconds', 0);
        let endOfDay = date.clone().set('hours', 23).set('minutes', 59).set('seconds', 59);

        const count = await this.userActivityRepository
        .createQueryBuilder('userActivity')
        .innerJoin('userActivity.parent', 'user')
        .where('userActivity.type = :type', { type: 'LOGIN' })
        .andWhere('userActivity.createDate >= :startOfDay', {
            startOfDay: startOfDay.unix(),
        })
        .andWhere('userActivity.createDate <= :endOfDay', {
            endOfDay: endOfDay.unix(),
        })
        .groupBy('user.id')
        .getCount();

        return count;
    }

    async findAllUsers():Promise<User[]>{
        return await this.userRepository.find();
    }
}
