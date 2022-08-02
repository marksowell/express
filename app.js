require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()
const port = process.env.PORT || 3000 
const projectName = process.env.PROJECTNAME

app.get('/', (req, res) => {
  res.send(`Mark Sowell - ${projectName}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
