
import axiosInstance from "@/app/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface LikesParams{
    userId? : number;
    postId?: number;
}

const useFavorite = (params:LikesParams) => {

    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState<boolean>(false); // 좋아요 상태 관리

    const toggleFavorite = async (e : React.MouseEvent<HTMLDivElement>) => {
        // 이벤트 버블링 방지
        e.stopPropagation();

        try {
            const { userId,postId } = params;
            const response = await axiosInstance.post('http://localhost:8080/api/v1/like/register',
                { params});
            // const response = await axios.post('http://localhost:8080/api/v1/like/register',
            //   { params});

        // 서버에서 반환된 TRUE/FALSE로 상태 업데이트
            setIsFavorite(response.data); 

            // 업뎃후 바로 반영 위해서 refresh
         //   router.refresh();
            toast.success('성공했습니다.')

        } catch (error) {
            toast.error('실패했습니다.')
        }

    }

    return {
        toggleFavorite,
        isFavorite
    }
}

export default useFavorite;