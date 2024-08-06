import { config } from "dotenv"
config()

import fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./api/users"

const app = fastify({ logger: true })
app.register(cors, { origin: process.env.CLIENT_URL })
app.register(userRoutes)

app.listen({ port: parseInt(process.env.PORT!) })
