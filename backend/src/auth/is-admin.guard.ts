import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    let authenticatedUser = context.switchToHttp().getRequest().user;

    if(authenticatedUser && authenticatedUser.name){
      let user = await this.userRepository.findOne({
        where: {
          name: authenticatedUser.name
        }
      })
      if(user && user.role == User.Role.ADMIN){
        return true;
      }
    }
    return false;
  }
}
