import UserService, {CreateUserPayload} from "../../Services/user"
import { CreateUserToken } from "../../Services/user"
import jwt from "jsonwebtoken"

const queries={
    getUserToken:async(_:any,paylaod:CreateUserToken)=>{
        const token =await UserService.getUserToken({
            email:paylaod.email,
            password:paylaod.password
        })

        return token;
    }
};

const mutations={
    createUser:async (_:any ,payload:CreateUserPayload)=>{
        const res=await UserService.createUser(payload);
        return res.id
    }
}



export const resolvers={queries,mutations};