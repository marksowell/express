# express

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Set Environment Variables

In order to align with security best practices, do not use the .env file to set environment variables. Insead, set environment variables on the hosting platform that you're using.

### Heroku

```heroku config:set KEY=VALUE --app <project-name>```
