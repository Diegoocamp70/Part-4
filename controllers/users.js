const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');



usersRouter.get('/', async (request, response, next) => {
  try { 
   const users = await User
   .find({})
   .populate('blogs' , { title: 1, author: 1, url: 1, likes: 1 });
   response.json(users)
} catch (error) {
   next(error);
 }
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password, blogs } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username and password must be 3' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let blogsObj = [];
                                // la operacion blog find va a la base de datos y busca los blogs
                                // con ayudad del operador in trae los id de los blogs que coinciden con los id de la base de datos 
   if (blogs.length > 0 && blogs ) {
    blogsObj = await Blog.find({ _id: { $in: blogs } });
   }if (blogsObj === null) {
    return response.status(400).json({ error: 'blogs not found' });
   }
   
  // in es un operador de comparacion que permite verificar si un valor se encuentra en un array  
  //  $in: blogs es un operador de consulta que selecciona los documentos donde el valor de un campo es igual a cualquier valor en la matriz especificada.
  const user = new User({
    username,
    name,
    passwordHash,
    blogs: blogsObj.map(blog => blog._id)
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});


module.exports = usersRouter