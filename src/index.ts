import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { server } from "typescript";

async function Init() {

    const app = express()
    const PORT = Number(process.env.PORT) || 3000;

    app.use(express.json());
    app.get('/', (req, res) => {
        res.send(" server is running ")
    })

    const server = new ApolloServer({
        typeDefs: `
        type Query{
            hello: String
            say(name:String) :String
        }
        `,
        resolvers: {

            Query: {
                hello: () => `hello, this is Karan using GraphQL`,
                say: (_parent, args) => {
                    const { name } = args;
                    return `hey ${name}, how are you?`;
                },
            },
        }
    })

    await server.start();
    app.use('/use', expressMiddleware(server))

    app.listen(PORT, () => console.log(`server is running on ${PORT}`))
}

Init()
