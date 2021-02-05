import express from 'express'
import DbContext from './db/DbConfig'
import Startup from './Startup'
import { logger } from './utils/Logger'

// create server & socketServer
const app = express()
const port = process.env.PORT || 3000

// Establish Socket
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Connect to Atlas MongoDB
DbContext.connect()

// Start Server
app.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})
