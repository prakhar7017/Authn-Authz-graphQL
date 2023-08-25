import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

//creating server
async function init(){
    const app=express();
    const PORT=process.env.PORT || 8000 ;

    app.use(express.json());

    const graphQlServer=new ApolloServer({
        typeDefs:`
            type Query {
                hello: String 
            }
        `, //schema
        resolvers:{
            Query :{
                hello:()=>`hello i am graphql`
            }
        }, //actual functions
    })

    await graphQlServer.start();
    
    app.get("/",(req,res)=>{
        res.status(200).json({
            success:true,
            message:"Backend is Up"
        })
    })

    app.use("/graphql",expressMiddleware(graphQlServer))
    
    app.listen(PORT,()=>{
        console.log(`Server has Started at ${PORT}`);
    })
}

init();