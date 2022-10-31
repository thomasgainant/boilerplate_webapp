import * as crypto from 'crypto';
import { env } from './environment';

export var EmailFormat:RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export function encrypt(clear:string):string{
    return crypto.createHash('md5').update(env.salt + clear).digest("hex");
}