import { ApolloServer } from "@apollo/server";
import {User} from "./user/index"

export default async function createApolloServer(){
    const graphQlServer = new ApolloServer({
        typeDefs: `
                ${User.typeDefs}
                type Query { 
                    ${User.queries}

                }
                type Mutation {

                    ${User.mutations}
                }
            `, //schema
        resolvers: {
          Query: {
            ...User.resolvers.queries
            
          },
          Mutation :{
            ...User.resolvers.mutations
          }
        }, //actual functions
      });
    
      await graphQlServer.start();

      return graphQlServer;
    
}

