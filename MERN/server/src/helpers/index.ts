//the point of the file is to help us either encrypit the
//password or generate an authentication token
import crypto from 'crypto';

const SECRET ='talal';
export const random =()=> crypto.randomBytes(128).toString('base64');
export const authentication = (salt:string,password:string)=>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex');
};