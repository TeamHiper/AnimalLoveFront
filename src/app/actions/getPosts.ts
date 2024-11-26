import axios from "axios";

export interface PostsParams{
    page?: number;
    size?: number;
}

export default async function getPostList(params:PostsParams) {
    try {

        const response = await axios.get('http://localhost:8080/api/v1/post/list', { params: params });

        return {
            data: response.data
        }

    } catch (error) {
        
    }
}