import * as crypto from 'crypto';
import 'colorts/lib/string';

const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");

const logger = (type:string, text:string) => {
    switch(type) {
        case "warn":
            return console.warn(`[WARN] ${text}`.yellow);
        case "info":
            return console.log(`[INFO] ${text}`.blue);
        case "error":
            return console.error(`[ERROR] ${text}`.red);
        case "success":
            return console.log(`[INFO] ${text}`.green);
        default:
            return console.log(`[INFO] ${text}`);
    }
}

export {md5, logger}