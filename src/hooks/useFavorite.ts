
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface LikesParams{
    currentUser: {
        username: string,
        email : string,
        profileImageUrl: string |null,
        role: string,
        name: string
    };
    postId: number;
}

const useFavorite = (params:LikesParams) => {

    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState<boolean>(false); // 좋아요 상태 관리
    const {currentUser,postId } = params;
    const formData = new URLSearchParams();
    formData.append('email', currentUser.email);
    formData.append('postId', postId.toString());
    // 좋아요 여부 확인
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/like/check`,formData ,
                    {
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                     },
                 });
                setIsFavorite(response.data);
            } catch (error) {
                console.error('Failed to fetch favorite status:', error);
            }
        };

        fetchFavoriteStatus();
    });

    const toggleFavorite = async (e : React.MouseEvent<HTMLDivElement>) => {
        // 이벤트 버블링 방지
        e.stopPropagation();

        try {

             const response = await axios.post('http://localhost:8080/api/v1/like',formData ,
               {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

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