import express from 'express'
import { queryBarcode } from './modules/proxy.js'
import dotenv from 'dotenv'

// Load the environment variables
dotenv.config()

// ---
const app = express()
const port = 3333
// ---

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/query', async (req, res) => {
    console.log("\n[i]---> Querying barcode: ", req.query.barcode)
    res.json(await queryBarcode(req.query.barcode, req.query.format))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})