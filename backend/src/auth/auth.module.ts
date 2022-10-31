import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'src/environment';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.salt,
      signOptions: { expiresIn: env.tokenExpiration },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [ AuthService ]
})
export class AuthModule {}
