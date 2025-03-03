require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express = require('express')
const app = express()

// controller 
const stripeController = require('./controllers/stripeController')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(cors())

// stripe 
app.post('/create-payment-intent', stripeController)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
