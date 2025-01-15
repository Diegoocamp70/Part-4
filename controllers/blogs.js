const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { getTokenFrom } = require('../utils/middleware');
//const LoginToken = require('../models/login');
/**
 * El objeto Router de Express te permite crear manejadores de rutas modulares y montables.
 * Un objeto Router es una instancia aislada de middleware y rutas. Puedes pensar en él como una "mini-aplicación"
 * que solo maneja un conjunto de rutas.
 * 
 * En este archivo, estamos utilizando el objeto Router para definir las rutas relacionadas con los blogs.
 * Luego, montamos este Router en una ruta base en el archivo principal de la aplicación (app.js).
 */

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/:id', async (request, response, next) => {
    try{
      const Blog =  await Blog.findById(request.params.id)  
      if(Blog){
        response.json(Blog)
      }
        else{
            response.status(404).end()
        }
    } catch (error) {
        next(error)  
    }
  
})




blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  const token = getTokenFrom(request);
  const verifidTokenUser = jwt.verify(token, process.env.SECRET);

  if(!verifidTokenUser || !token){
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  user = await User.findById(verifidTokenUser.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
      const user = request.user
      const token = getTokenFrom(request);
      const verifidTokenUser = jwt.verify(token, process.env.SECRET);
      
      if (!token || !verifidTokenUser) {
        return response.status(401).json({
          error: 'token missing or invalid'
        })
      }
       user = await User.findById(verifidTokenUser.id);
      const blog = await Blog.findById(request.params.id);

      if (!user || !blog) {
        return response.status(404).json({ error: 'user or blog not found' });
      }
      
      if ( blog.user.toString() === user.toString() ){
        try{
          await Blog.findByIdAndDelete(request.params.id)
          response.status(204).end()
      } catch (error) {
          next(error)
      }
  
      } else if (blog.user.toString() !== user.toString() ) {
        return response.status(401).json({
          error: 'invalid user'
        })
      }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
        url: body.url,
        likes: body.likes
    }
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})




module.exports = blogsRouter
