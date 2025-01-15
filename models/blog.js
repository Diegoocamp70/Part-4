const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes:{
    type: Number,
    default: 0
  },
  user:{
     type: mongoose.Schema.Types.ObjectId, // define el tipo de dato como un indeficador de objecto
      ref: 'User' // define la referencia a la coleccion User 
  }
})
/*
- Permite establecer relaciones entre diferentes colecciones en la base de datos.
-Facilita la población de datos relacionados utilizando el método populate de Mongoose.


*/
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)