import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    console.log(id)
    console.log(newObject)
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteItem: deleteItem,
}