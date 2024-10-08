const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 37,
        userId: '1343423242'
    },
    {
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 46,
        userId: '1343423245'
    },
    {
        title: 'title3',
        author: 'author3',
        url: 'url3',
        likes: 33,
        userId: '1343423241'
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
    await User.deleteMany({})
    userObject = new User({
        username: "atte",
        name: "atte",
        password: "moikka"
    })
    await userObject.save()
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
    const response1 = await api.get('/api/users')
    console.log(response1.body[0].id)


    const newBlog = {
        title: 'title4',
        author: 'author4',
        url: 'url4',
        likes: 123,
        _id: response1.body[0].id
    }

    console.log(newBlog._id)

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
    const response1 = await api.get('/api/users')
    console.log(response1.body[0])

    const newBlog = {
        title: 'title4',
        author: 'author4',
        url: 'url4',
        _id: response1.body[0].id
    }

    console.log(newBlog._id)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

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

test('deleting a blog works', async () => {
    let response = await api.get('/api/blogs')
    const idOfBlog = response.body[0].id

    await api
        .delete(`/api/blogs/${idOfBlog}`)
        .expect(204)

    response = await api.get('/api/blogs')

    assert.notStrictEqual(response.body[0].id, idOfBlog)
})

test('updating a blog works', async () => {
    let updatedBlog = {
        title: 'updatedBlog',
        author: 'updatedAuthor',
        url: 'updatedUrl',
        likes: 91,
    }
    let response = await api.get('/api/blogs')
    const idOfBlog = response.body[0].id

    await api
        .put(`/api/blogs/${idOfBlog}`)
        .send(updatedBlog)
        .expect(200)

    response = await api.get('/api/blogs')

    assert.strictEqual(response.body[0].likes, 91)
})

test('username or password with <3 characters not allowed', async () => {
    let newUser = {
        username: 'at',
        name: 'atte',
        password: 'moi'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
    newUser = {
        username: 'atte',
        name: 'atte',
        password: 'mo'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
})

after(async () => {
    await mongoose.connection.close()
})