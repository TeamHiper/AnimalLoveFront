import axios from "axios";

export interface UserParams{
    accessToken : string | null;
}

export default async function getCurrentUser(params:UserParams) {
    try {
        const { accessToken } = params;

        if (!accessToken) {
          return null;
        }

        const response = await axios.get('http://localhost:8080/api/v1/user/getUser',
          { params: params,
            headers: {
                Authorization: `${accessToken}`
            },
            withCredentials: true
           });

        // 서버에서 새로운 Access Token이 전달되었는지 확인
        const newAccessToken = response.headers['New-Access-Token']; // 헤더 이름은 대소문자 무시
        if (newAccessToken) {
            // 새로운 Access Token을 저장 (세션 스토리지 또는 로컬 스토리지)
            sessionStorage.setItem('accessToken', newAccessToken);
            console.log('새로운 Access Token 저장:', newAccessToken);
        }
        console.log(response.data);
        return {
            data: response.data
        }

    } catch (error) {
        
    }
}