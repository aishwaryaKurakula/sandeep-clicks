const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/gallery',  require('./routes/galleryRoutes'))

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})