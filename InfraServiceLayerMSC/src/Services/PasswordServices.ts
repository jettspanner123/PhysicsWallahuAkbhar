import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordServices {

    public constructor() {
    }

    public async hashPassword(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString('hex');
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${salt}:${derivedKey.toString('hex')}`);
                }
            });
        });
    }

    public async verifyPassword(password: string, hash: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const parts = hash.split(':');
            const salt = parts[0];
            const key = parts[1];
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key === derivedKey.toString('hex'));
                }
            });
        });
    }
}
