import UserService, {CreateUserPayload} from "../../Services/user"
import { CreateUserToken } from "../../Services/user"


const queries={
    getUserToken:async(_:any,paylaod:CreateUserToken)=>{
        const token =await UserService.getUserToken({
            email:paylaod.email,
            password:paylaod.password
        })

        return token;
    },
    getCurrentLoggedInUser:async (_:any,parameters:any,context:any)=>{
        console.log(context);
        if(context && context.user){
            const id= context.user.id
            const user=await UserService.getUserById(id);
            return user
        }
        throw new Error("Cannot find Context")

    }
};

const mutations={
    createUser:async (_:any ,payload:CreateUserPayload)=>{
        const res=await UserService.createUser(payload);
        return res.id
    }
}



export const resolvers={queries,mutations};