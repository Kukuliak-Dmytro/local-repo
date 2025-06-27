import axiosClient from "../utils/http";

export const getProducts = async (title = '') => {
    try {
        const response = await axiosClient.get('/products', {
            params: {
                title
            }
        })
        console.log(response.data)
        return response.data
    }
    catch (error) {
        console.log(error)
        throw error;
    }

}