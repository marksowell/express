require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()
const port = process.env.PORT || 3000 

app.get('/', (req, res) => {
  res.send('Mark Sowell - Express App')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})