const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            title: 'Kauppakassi blog',
            author: 'Pasi Viheraho',
            url: 'pasiviheraho.com',
            likes: 40,
            id: '66fc1c6e7157f7a558d4ee51',
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 40)
    })
})

describe('favorite blog', () => {
    const listWithThreeBlogs = [
        {
            title: 'title1',
            author: 'author1',
            url: 'url1',
            likes: 37,
            id: 'id1',
        },
        {
            title: 'title2',
            author: 'author2',
            url: 'url2',
            likes: 46,
            id: 'id2',
        },
        {
            title: 'title3',
            author: 'author3',
            url: 'url3',
            likes: 33,
            id: 'id3',
        }
    ]
    const biggest = listWithThreeBlogs[1]
    test('equals the most liked blog', () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        assert.strictEqual(result, biggest)
    })
})