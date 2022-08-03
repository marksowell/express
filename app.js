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

app.post('/webhook', (req, res) => {

  var response

  console.log(req.body)
  console.log(req.headers)

  // create the message string
  var message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`
  console.log(message)

  // hash the message string with your Webhook Secret Token and prepend the version semantic
  var signature = `v0=${crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(message).digest('hex')}`
  console.log(signature)

  // you validating the request came from Zoom https://marketplace.zoom.us/docs/api-reference/webhook-reference#notification-structure
  if (req.headers['x-zm-signature'] === signature) {

    // Zoom validating you control the webhook endpoint https://marketplace.zoom.us/docs/api-reference/webhook-reference#validate-webhook-endpoint
    if(req.body.event === 'endpoint.url_validation') {
      var hash = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(req.body.payload.plainToken).digest('hex')

      response = {
        message: {
          plainToken: req.body.payload.plainToken,
          encryptedToken: hash
        },
        status: 200
      }

      console.log(response.message)

      res.status(response.status)
      res.json(response.message)
    } else {
      response = { message: 'Authorized request to Webhook Sample Node.js.', status: 200 }

      console.log(response.message)

      res.status(response.status)
      res.json(response)

      // business logic here, example make API request to Zoom or 3rd party

    }
  } else {

    response = { message: 'Unauthorized request to Webhook Sample Node.js.', status: 200 }

    console.log(response.message)

    res.status(response.status)
    res.json(response)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
