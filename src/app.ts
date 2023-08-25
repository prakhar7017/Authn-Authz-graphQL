import express from "express";
// import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import { prismaClient } from "./lib/db";
import createApolloServer from "./graphQl/index"

//creating server
async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Backend is Up",
    });
  });

  app.use("/graphql", expressMiddleware(await createApolloServer()));

  app.listen(PORT, () => {
    console.log(`Server has Started at ${PORT}`);
  });
}

init();
