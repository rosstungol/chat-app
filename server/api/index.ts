import { config } from "dotenv"
config()

import fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./users"

const app = fastify({ logger: true })
app.register(cors, { origin: process.env.CLIENT_URL })
app.register(userRoutes)

app.listen({ port: parseInt(process.env.PORT!) })

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send(html)
})

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Chat App Server</title>
    </head>
    <body>
      <h1>Chat App Server</h1>
    </body>
  </html>
`
