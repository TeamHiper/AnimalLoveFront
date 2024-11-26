
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";



const useFavorite = () => {

    const router = useRouter();


    const toggleFavorite = async (e : React.MouseEvent<HTMLDivElement>) => {
        // 이벤트 버블링 방지
        e.stopPropagation();

        try {
            let request;


            // 업뎃후 바로 반영 위해서 refresh
            router.refresh();
            toast.success('성공했습니다.')

        } catch (error) {
            toast.error('실패했습니다.')
        }

    }

    return {
        toggleFavorite
    }
}

export default useFavorite;