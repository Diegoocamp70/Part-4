const mongoose = require('mongoose')
require('dotenv').config({ path: './Entorno.env' });
const logger = require('./utils/loggers');

const blogSchema = new mongoose.Schema({
     title: String,
     author: String,
    content: String,
    url: String,
    likes: Number,

})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Blog = mongoose.model('Blog', blogSchema)

const url = process.env.TEST_MONGODB_URI

mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB');

    const blog = new Blog({
      title: 'New Blog Post',
      author: 'Author Name',
      content: 'This is a new blog post',
      url: 'http://example.com',
      likes: 0
    });

    return blog.save();
  })
  .then(() => {
    logger.info('blog saved!');
    return mongoose.connection.close();
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });