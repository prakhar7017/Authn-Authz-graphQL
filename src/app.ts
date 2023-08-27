import express from "express";
// import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import { prismaClient } from "./lib/db";
import createApolloServer from "./graphQl/index"
import UserService from "./Services/user";
import cors from "cors"

//creating server
async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  app.use(cors())
  
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Backend is Up",
    });
  });

  app.use("/graphql", expressMiddleware(await createApolloServer(),{
    context: async({req})=>{
      // @ts-ignore 
      const token=req.headers["token"]
      console.log(token)
      try {
        console.log("going to decode")
        const user=await UserService.decodeJwtToken(token as string);
        console.log("passed from app.js")
        return {user};
      } catch (error) {
        return {}
      }

    }
  }));

  app.listen(PORT, () => {
    console.log(`Server has Started at ${PORT}`);
  });
}

init();
