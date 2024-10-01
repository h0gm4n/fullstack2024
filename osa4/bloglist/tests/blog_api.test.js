const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 37,
    },
    {
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 46,
    },
    {
        title: 'title3',
        author: 'author3',
        url: 'url3',
        likes: 33,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('correct amount of notes are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})