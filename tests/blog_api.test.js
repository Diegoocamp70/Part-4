const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');
const User = require('../models/user')
const { has } = require('lodash');
const { getTokenFrom, userExtractor } = require('../utils/middleware');
const { constants } = require('node:buffer');
const api = supertest(app)

describe('Blog API tests', () => {

  let token;

  beforeAll(async () => {
    
    const user = new User({ username: 'Diego', password: 'password' })
    await user.save()

    
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)
  })



test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('blog was delete', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const blog = blogs[2]

  await api
  .delete(`/api/blogs/${blog.id}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(204)

  const blogDelete= await api.get('/api/blogs')
  const body = blogDelete.body
  
  assert.strictEqual(body.find(body => body.id === blog),undefined) 

})

/*
test('blog was updated', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const blogSeleted = blogs[10]
  
  const blog = {
    title: 'pedro el 2',
    author: ' pedro',
    content: ' pedro el escamoso',
    url: 'http://example.com',
    likes: 9
  }


 const updated= await api.put(`/api/blogs/${blogSeleted.id}`)
  .send(blog)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  console.log('updated repuesta ', updated.body); 

  const updatedBlog = await api.get(`/api/blogs/${blogSeleted.id}`);
  const body = updatedBlog.body;

  console.log('Expected title:', blog.title);
  console.log('Actual title:', body.title);
  console.log('Expected author:', blog.author);
  console.log('Actual author:', body.author);
  
  assert.strictEqual(body.title, blog.title);
  assert.strictEqual(body.author, blog.author);
})

*/
test('the id blogs is id not _id', async () => {
  const response = await api.get('/api/blogs')
 const blogs = response.body;

  blogs.forEach(blog =>{
    assert.strictEqual(blog.hasOwnProperty('id'), true)
    assert.strictEqual(blog.hasOwnProperty('_id'), false)
  })
})
test('One new blog was created', async () => {
  const responseBefore = await api.get('/api/blogs')

  
  const blogsBefore = responseBefore.body.length
  const blog = {
    title: 'pedro el escamoso',
    author: ' pedro',
    content: ' pedro el escamoso',
    url: 'http://example.com',
    likes: 9
  }


  await api.post('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .send(blog)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  const responseafther= await api.get('/api/blogs')
  const blogsBeforeafther = responseafther.body.length

  assert.strictEqual(blogsBeforeafther, blogsBefore + 1)
})
/*
test('if propierty likes doesnt exists its going to be zero', async () => {
  
  const blog = {
    title: 'pedro el escamoso',
    author: ' pedro',
    content: ' pedro el escamoso',
    url: 'http://example.com'
  }
   await api.post('/api/blogs')
  .send(blog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  
})

test('if propierty title and url doesnt exits the server going to renpond with 404 bad request', async () => {
  
  const blog = {
    author: ' pedro',
    content: ' pedro el escamoso',
    likes: 9
  }


   await api.post('/api/blogs')
  .send(blog)
  .expect(400)
  .expect('Content-Type', /application\/json/)



})
*/


after(async () =>{
    await mongoose.connection.close()
})

})
