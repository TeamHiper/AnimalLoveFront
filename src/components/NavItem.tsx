import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';



interface NavItemProps {
  mobile?: boolean;
  currentUser?: | null;

}

const NavItem = ({mobile, currentUser}:NavItemProps) => {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver"; // 페이지 새로고침하며 이동
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "post", // 서버에서 로그아웃 처리를 위해 POST 요청 사용
        credentials: "include", // 쿠키 포함
      });
  
      if (response.ok) {
        sessionStorage.clear();
        // 로그아웃 성공 시 리다이렉트 또는 알림
        window.location.href = "/"; // 메인 페이지로 리다이렉트
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
        <li className='py-2 px-4 text-center border-2 text-lg border-gray-400 bg-slate-400 rounded-full cursor-pointer'><Link href="/team">팀원 모집하기</Link></li>
        <li className='py-2 px-4 text-center border-b-4 cursor-pointer text-lg'><Link href="/user">비즈니스 문의</Link></li>
        {currentUser?
        <>
          <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><Link href= "/posts/upload"
          >글쓰기</Link></li>
          <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button onClick={handleLogout}
          >로그아웃</button></li>
        </>
        :
        <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button onClick={handleLogin}>로그인</button></li>
        }
    </ul>
  )
}

export default NavItem