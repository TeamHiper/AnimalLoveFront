import { DetailPostProps } from "@/components/posts/DetailPost";
import axios from "axios";

export interface PostProps {
        postId: number;
}

export default async function getPost(params:PostProps) {
    try {
        const { postId } = params;
        const response = await axios.get(`http://localhost:8080/api/v1/post/detail/${postId}`);

        return {
            data: response.data
        }

    } catch (error) {
        console.error('Error fetching post:', error);
        return { data: null };
    }
}