import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { UserActivity } from 'src/users/entity/user-activity.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ User, UserActivity ])
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {}
