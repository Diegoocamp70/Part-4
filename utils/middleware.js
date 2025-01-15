const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config({ path: './Entorno.env' });

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
  };
  
 
  
  const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
  
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
    })

    }
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization') // obtiene el valor del encabezado authorization
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '') // renplaza bearer por el valor del token
  }
  return null
  next()
  };
  
  const userExtractor = (request, response, next) => {
    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }
    request.user = user
    next()
    
  }

  module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }