import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from './users.service';
import { UserActivity } from './entity/user-activity.entity';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([ User, UserActivity ]),
  ],
  exports: [UsersService]
})
export class UsersModule {}
