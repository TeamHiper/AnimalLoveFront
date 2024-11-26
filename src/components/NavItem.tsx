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
  
  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
        <li className='py-2 px-4 text-center border-2 text-lg border-gray-400 bg-slate-400 rounded-full cursor-pointer'><Link href="/team">팀원 모집하기</Link></li>
        <li className='py-2 px-4 text-center border-b-4 cursor-pointer text-lg'><Link href="/user">비즈니스 문의</Link></li>
        {currentUser?
        <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button
        >로그아웃</button></li>
        :
        <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button onClick={handleLogin}>로그인</button></li>
        }
    </ul>
  )
}

export default NavItem