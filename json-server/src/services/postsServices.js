import axios from 'axios'
const baseUrl = 'http://localhost:3000'
export async function getAllPosts() {
    try {
        const response = await axios.get(`${baseUrl}/posts?_sort=created_at&order=asc`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export async function getPostById(id){
    try{
        const response = await axios.get(`${baseUrl}/posts/${id}`)
        // console.log(response.data)
        return response.data

    }
    catch(error){
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

export async function updatePost(id, post) {
    try{
        const response = await axios.put(`${baseUrl}/posts/${id}`, post)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}
export async function deletePost(id) {
    try{
        const response = await axios.delete(`${baseUrl}/posts/${id}`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.error(error)
    }
}
