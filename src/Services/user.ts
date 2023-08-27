import { prismaClient } from "../lib/db"
import {createHmac,randomBytes} from "node:crypto"

export interface CreateUserPayload{
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
}

class UserService {
    public static createUser(paylaod:CreateUserPayload){
        const {firstName,lastName,email,password} =paylaod;
        const salt=randomBytes(32).toString("hex");
        const HashPassword= createHmac("sha256",salt).update(password).digest("hex")
        return prismaClient.user.create({
            data:{
                firstName,lastName,email,password:HashPassword,salt
            },
        })

    }
}

export default UserService;
