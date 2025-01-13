import axios from "axios";

export interface PostsParams{
    category? : string;
    page?: number;
    size?: number;
}

export default async function getPostList(params:PostsParams) {
    try {
        const { category,page,size } = params;

        if(category){
            
        }

        const response = await axios.get('http://localhost:8080/api/v1/post/list', { params: params });

        //const totalPage = await axios.get('http://localhost:8080/api/v1/post/list');
        
        return {
            data: response.data,
            totalPage : 11
        }

    } catch (error) {
        
    }
}