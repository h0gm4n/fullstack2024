const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, current) => accumulator + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blogsByLikes = blogs.sort((a, b) => b.likes - a.likes)
    const blogsByLikesFirst = blogsByLikes[0]
    return blogsByLikesFirst
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}