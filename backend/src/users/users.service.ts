import * as crypto from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/entity/user.entity';
import { UserActivity } from './entity/user-activity.entity';
import { env } from 'src/environment';
import { EmailFormat, encrypt } from 'src/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
    private emailTransporter:any;

    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<UserActivity>,
    ){
        this.emailTransporter = nodemailer.createTransport({
            host: env.smtpHost,
            port: env.smtpPort,
            secure: false, // true for 465, false for other ports
            auth: {
              user: env.smtpUser, // generated ethereal user
              pass: env.smtpPassword, // generated ethereal password
            },
        });
    }

    async create(createUserDto: CreateUserDto) {
        let validEmail = createUserDto.email.match(EmailFormat);
        if(!validEmail){
          throw new HttpException('Invalid email.', HttpStatus.UNAUTHORIZED);
        }
    
        let validName = createUserDto.name.match(env.userNameFormat);
        if(!validName || createUserDto.name.length < 3 || createUserDto.name.length > 255){
          throw new HttpException('Invalid username.', HttpStatus.UNAUTHORIZED);
        }
    
        if(createUserDto.password.length < 8){
          throw new HttpException('Invalid password.', HttpStatus.UNAUTHORIZED);
        }
    
        let alreadyUser = await this.userRepository.findOne({
            where: {
                name: createUserDto.name
            }
        });
        if(alreadyUser){
          throw new HttpException('Name already used.', HttpStatus.UNAUTHORIZED);
        }
        else{
          alreadyUser = await this.userRepository.findOne({
            where:{
                email: createUserDto.email
            }
          });
          if(alreadyUser){
            throw new HttpException('Email already used.', HttpStatus.UNAUTHORIZED);
          }
          else{
            if(createUserDto.email.length < 8){
              throw new HttpException('Password is invalid.', HttpStatus.UNAUTHORIZED);
            }
            else{
              let newUser = new User();
              newUser.name = createUserDto.name;
              newUser.email = createUserDto.email;
              newUser.password = encrypt(createUserDto.password);
              newUser.confirmKey = uuid();
              newUser.confirmDate = dayjs().add(env.registrationExpiration, 'minutes').unix();
              newUser.currentCredits = env.userStartCredits;
              newUser = await this.userRepository.save(newUser);
    
              let emailConfirmationLink = `${env.mainURL}/confirm/${newUser.name}/${newUser.confirmKey}`;
    
              let info;
              try{
                info = await this.emailTransporter.sendMail({
                    from: '"'+env.appName+'" <registration@'+env.domain+'>', // sender address
                    to: newUser.email, // list of receivers
                    subject: "Registration on "+env.appName, // Subject line
                    html: `
                    <h1>Hi, ${newUser.name}!</h1>
                    <p>You received this email because an account on our website has been created using this email address.</p>
                    <p>In order to confirm your account, you need to click the following link or paste it into your web browser:</p>
                    <p><a href="${emailConfirmationLink}">${emailConfirmationLink}</a></p>
                    <p>If you don't want to register on our website, this registration will anyway expire in one hour if it is not confirmed.</p>
                    `, // html body
                });
              }
              catch(e){
                console.error("Error: no message sent to "+newUser.email+" during registration!");
                throw new HttpException('Error in registration.', HttpStatus.INTERNAL_SERVER_ERROR);
              }

              if(!info.messageId){
                console.error("Error: no message sent to "+newUser.email+" during registration!");
                throw new HttpException('Error in registration.', HttpStatus.INTERNAL_SERVER_ERROR);
              }
              else{
                return newUser;
              }
            }
          }
        }
      }
    
      async confirm(name:string, confirmKey:string){
        let user = await this.userRepository.findOne({
            where: {
                name: name
            }
        });
        if(user){
          if(user.confirmKey === confirmKey){
            user.confirmKey = null;
            user.confirmDate = dayjs().unix();
            user.role = User.Role.NORMAL;
            await this.userRepository.save(user);
            await this.logActivity(user, "CONFIRM", confirmKey);            
            return user;
          }
          else{
            throw new HttpException('Confirm key invalid or expired.', HttpStatus.UNAUTHORIZED);
          }
        }
        else{
          throw new HttpException('Not found.', HttpStatus.NOT_FOUND);
        }
      }

    async findOne(login: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                name: login
            }
        });
    }

    public async logActivity(user:User, activityType:string, comment:string, when:dayjs.Dayjs = dayjs()){
      let activity = new UserActivity();
      activity.type = activityType;
      activity.comment = comment;
      activity.createDate = when.unix();
      await this.userActivityRepository.save(activity);

      if(!user.activity)
        user.activity = [];
      user.activity.push(activity);
      await this.userRepository.save(user);
    }
}