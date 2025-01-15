const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('Favorite blog', () => {
 

    const listWithMultipleBlogs = [
        {
          _id: '13131313',
          title: 'top gun l',
          author: 'pedro lucas',
          url: '----',
          likes: 5,
          __v: 0
        },
        {
          _id: '52121212',
          title: ' betty la fea',
          author: ' juan lucas',
          url: '-----',
          likes: 12,
          __v: 0
        },

        {
            _id: '52121212',
            title: 'cars 2',
            author: 'johan damian',
            url: '-----',
            likes: 13,
            __v: 0
        }
    ]

  
    test('The favorite blog', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs)
      assert.deepStrictEqual(result,            {
        _id: '52121212',
        title: 'cars 2',
        author: 'johan damian',
        url: '-----',
        likes: 13,
        __v: 0
      })
    })
    
  })