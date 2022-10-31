import * as dayjs from 'dayjs';
import { User } from 'src/users/entity/user.entity';
import { FindManyOptions, IsNull, LessThan, Not, Repository } from "typeorm";

export async function registrationCleanupRoutine(usersRepository: Repository<User>){
    let now = dayjs();

    console.log("======");
    console.log("Registration routine - "+now.toISOString());

    let findConditions:FindManyOptions<User> = {
        where: [
            {
                confirmKey: Not(IsNull()),
                confirmDate: LessThan(now.unix())
            }
        ]
    };
    let unconfirmedUsers = await usersRepository.find(findConditions);
    console.log("Found "+unconfirmedUsers.length+" user(s) with expired registration.");
    if(unconfirmedUsers.length > 0){
        for(let unconfirmedUser of unconfirmedUsers){
            console.log("Deleting unconfirmed user "+unconfirmedUser.id+" with user name \""+unconfirmedUser.name+"\"");
            await usersRepository.remove(unconfirmedUser);
        }
        console.log("Done deleting user(s) with expired registration.");
    }
    console.log("======");
}