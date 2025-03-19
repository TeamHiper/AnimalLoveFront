import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Image from 'next/image';



interface NavItemProps {
  mobile?: boolean;
  currentUser?: any | null;

}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_OAUTH_NAVER}`; // 페이지 새로고침하며 이동
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOGOUT}`, {
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
      <li className='py-2 px-4 text-center border-2 text-lg border-gray-400 bg-slate-400 rounded-full cursor-pointer'><Link href="/team">메시지</Link></li>
      <li className='py-2 px-4 text-center border-b-4 cursor-pointer text-lg'><Link href="/user">알림</Link></li>
      {currentUser ?
        <>
          <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><Link href="/posts/upload"
          >글쓰기</Link></li>
          <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button onClick={handleLogout}
          >로그아웃</button></li>
          <li className='flex items-center justify-center py-2'>
            <Link href={'/account'}>
              <Image
                src={currentUser.profileImageUrl}
                alt="Profile Image"
                width={40} // 원하는 크기로 조정
                height={40}
                className="rounded-full"
              />
            </Link>
          </li>
        </>
        :
        <li className='py-2 text-center border-b-4 cursor-pointer text-lg'><button onClick={handleLogin}>로그인</button></li>
      }
    </ul>
  )
}

export default NavItem