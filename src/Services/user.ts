import { prismaClient } from "../lib/db"
import {createHmac,randomBytes} from "node:crypto"
import JWT from "jsonwebtoken";
const jwt_secret='prakharmaheshwariypyo'

export interface CreateUserPayload{
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
}

export interface CreateUserToken{
    email:string;
    password:string;
}

class UserService {

    private static generateHash(password:string,salt:string){
        const HashPassword= createHmac("sha256",salt).update(password).digest("hex")
        return HashPassword;
    }

    public static createUser(paylaod:CreateUserPayload){
        const {firstName,lastName,email,password} =paylaod;
        const salt=randomBytes(32).toString("hex");
        const HashPassword=UserService.generateHash(password,salt);
       
        return prismaClient.user.create({
            data:{
                firstName,lastName,email,password:HashPassword,salt
            },
        })

    }

    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where:{email:email}});
    } 

    public static async getUserToken(payload:CreateUserToken){
        const {email,password}=payload;

        if(!email || !password){
            throw new Error("provide email and password");
        }

        const user=await UserService.getUserByEmail(email);

        if(!user){
            throw new Error("User not found");
        }

        const userSalt=user.salt;

        const userHashPassword=UserService.generateHash(password,userSalt);

        if(userHashPassword!=user.password){
            throw new Error("Password is incorrect");
        }

        const token=JWT.sign({id:user.id,email:user.email},jwt_secret)

        return token;
    }

    public static async decodeJwtToken(token:string){
        const decdedtoken=await JWT.verify(token,jwt_secret);
        console.log(decdedtoken);
        return decdedtoken;    
    }

    public static getUserById(id:string){
        return prismaClient.user.findUnique({where:{id:id}})
    }
}

export default UserService;
