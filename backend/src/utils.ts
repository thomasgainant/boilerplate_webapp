import * as crypto from 'crypto';
import { env } from './environment';

export var EmailFormat:RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export function encrypt(clear:string):string{
    return crypto.createHash('md5').update(env.asymmetricalEncryption_key + clear).digest("hex");
}

export class CryptedString{
    iv:string;
    encryptedData:string;

    constructor(iv:string, encryptedData:string){
        this.iv = iv;
        this.encryptedData = encryptedData;
    }
}

export function encrypt_symmetric(clear:string, publicKey:string):CryptedString{
    let cipher = crypto.createCipheriv(env.symmetricEncryption_algorithm, Buffer.from(env.symmetricEncryption_key), Buffer.from(publicKey));
    let encrypted = cipher.update(clear);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return new CryptedString(publicKey, encrypted.toString('hex'));
}

export function decrypt_symmetric(encrypted:CryptedString):string{
    let iv = new TextEncoder().encode(encrypted.iv);
    let encryptedText = Buffer.from(encrypted.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(env.symmetricEncryption_algorithm, Buffer.from(env.symmetricEncryption_key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}