import { ApolloServer } from "@apollo/server";

export default async function createApolloServer(){
    const graphQlServer = new ApolloServer({
        typeDefs: `
                type Query { 
                }
                type Mutation {
                }
            `, //schema
        resolvers: {
          Query: {
            
          },
          Mutation :{

          }
        }, //actual functions
      });
    
      await graphQlServer.start();

      return graphQlServer;
    
}

