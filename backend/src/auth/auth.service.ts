import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { encrypt } from 'src/utils';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(login);
        if (user && user.password === encrypt(password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any) {
      const payload = { username: user.name, sub: user.userId };
      let token = this.jwtService.sign(payload);

      let userFull = await this.usersService.findOne(user.name);

      return {
        access_token: token,
        name: userFull.name
      };
    }
}
