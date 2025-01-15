const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '51121212',
        title: 'solo',
        author: 'pablo',
        url: '...',
        likes: 5,
        __v: 0
      }
      

    ]

    const listWithMultipleBlogs = [
        {
          _id: '12121212',
          title: 'zombies',
          author: 'sara',
          url: 'dadadad',
          likes: 5,
          __v: 0
        },
        {
          _id: '2121212',
          title: 'aadadad',
          author: 'pedro lucas',
          url: '1212121',
          likes: 12,
          __v: 0
        }
    ]

  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('when the list has multiple blogs, equals the sum of liks of all blogs', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 17)
    })

    test('when the list has not blogs, equals to  zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
  })