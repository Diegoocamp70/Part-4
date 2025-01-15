const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('the most famous author', () => {
 

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'top gun l',
          author: 'pedro lucas',
          url: '-----',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'lucas el perdido',
          author: 'Juan Pedro',
          url: '------',
          likes: 12,
          __v: 0
        },

        {
            _id: '5a422aa71b54a676234d17f10',
            title: 'cars 2',
            author: 'Juan Pedro',
            url: '-----',
            likes: 13,
            __v: 0
        }
    ]

  
    test('The most famous author is', () => {
           const result = listHelper.mostBlogs(listWithMultipleBlogs)
           assert.deepStrictEqual(result,  {
              author: "Juan Pedro",
              blogs: 2
           }

              )
       })
  })
