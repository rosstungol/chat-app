import { config } from "dotenv"
config()

import fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./routes/users"

const app = fastify()
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
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify Hello World</title>
    <meta
      name="description"
      content="This is a starter template for Vercel + Fastify."
    />
  </head>
  <body>
    <p>Hello</p>
  </body>
</html>
`
