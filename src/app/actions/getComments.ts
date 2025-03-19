import axios from "axios";

export interface CommentProps{
    postId: number;
}

export default async function getComments({postId}:CommentProps){

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/detail/${postId}`);

    return {
        data: response.data
    }
}