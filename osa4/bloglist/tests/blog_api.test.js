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

test('blog object has id field', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(function (res) {
            assert(res.body[0].hasOwnProperty('id'))
        })
})

test('posting blogs work', async () => {
    const newBlog = {
        title: 'title4',
        author: 'author4',
        url: 'url4',
        likes: 123,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(contents.includes('title4'))
})

test('posting blog without likes results in blog with 0 likes', async () => {
    const newBlog = {
        title: 'title4',
        author: 'author4',
        url: 'url4',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log(response.body[response.body.length - 1])
    assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('posting blog without url or title field results in error', async () => {
    let newBlog = {
        title: 'title4',
        author: 'author4',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    newBlog = {
        author: 'author4',
        url: '432'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


})

after(async () => {
    await mongoose.connection.close()
})