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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/list`, { params: params });

        const totalPage = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/list/count`);

        return {
            data: response.data,
            totalPage : totalPage.data
        }

    } catch (error) {
        
    }
}