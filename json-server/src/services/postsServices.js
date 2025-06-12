import axios from 'axios'
const baseUrl = 'http://localhost:3000'
export async function getAllPosts() {
    try {
        const response = await axios.get(`${baseUrl}/posts`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function createPost(post) {
    try {
        const response = await axios.post(`${baseUrl}/posts`, post)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}