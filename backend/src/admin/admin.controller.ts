import { Controller, Get, Render } from '@nestjs/common';
import { env } from 'src/environment';

@Controller('admin')
export class AdminController {
    @Get()
    @Render('index.pug')
    renderDashboards() {
        return {
            appName: env.appName
        };
    }

    @Get("/users")
    @Render('users.pug')
    renderUsers() {
        return {
            appName: env.appName,
            users: []
        };
    }
}
