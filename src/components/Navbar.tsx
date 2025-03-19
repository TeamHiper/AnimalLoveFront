'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import NavItem from './NavItem';
import getCurrentUser from '@/app/actions/getCurrentUser';


const Navbar = () => {

const [menu, setMenu] = useState(false);
const [currentUser, setCurrentUser] = useState<any>(); // 사용자 상태

useEffect(() => {
  // 비동기 작업을 위한 함수 선언
  const fetchUser = async () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 세션 스토리지에서 토큰 가져오기
    if (accessToken) {
      const user = await getCurrentUser({accessToken}); // 서버 함수 호출
      setCurrentUser(user?.data); // 사용자 상태 업데이트
    }
  };

  fetchUser(); // 비동기 함수 호출
}, []);
const handleMenu = () => {
    setMenu(!menu);
}
  return (
    <nav className='relative z-10 w-full bg-green-600 text-white'>
        
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
            
            <div className='flex items-center text-3xl h-20'>
                <Link href="/">Logo</Link>
            </div>
            
            <div className='text-2xl sm:hidden'>
                {menu === false ? 
                <button onClick={handleMenu}>+</button> : 
                <button onClick={handleMenu}>-</button>}
            </div>

            <div className='hidden sm:block'>
                <NavItem currentUser = {currentUser}/>
            </div>
        </div>

        <div className='block sm:hidden'>
            {(menu === false) ? null : <NavItem mobile currentUser = {currentUser}/>}
        </div>

    </nav>
  )
}

export default Navbar