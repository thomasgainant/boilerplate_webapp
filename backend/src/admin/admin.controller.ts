import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from 'src/auth/is-admin.guard';
import { env } from 'src/environment';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){

    }

    @UseGuards(AuthGuard('jwt'), IsAdminGuard)
    @Get()
    @Render('index.pug')
    async renderDashboards() {
        let dailyActiveUsers = await this.adminService.getDailyActiveUsersForLastMonth();
        return {
            appName: env.appName,
            usersData: JSON.stringify(dailyActiveUsers)
        };
    }

    @UseGuards(AuthGuard('jwt'), IsAdminGuard)
    @Get("/users")
    @Render('users.pug')
    async renderUsers() {
        let dailyActiveUsersData = await this.adminService.getDailyActiveUsersForLastMonth();
        return {
            appName: env.appName,
            usersData: JSON.stringify(dailyActiveUsersData),
            users: await this.adminService.findAllUsers()
        };
    }
}
