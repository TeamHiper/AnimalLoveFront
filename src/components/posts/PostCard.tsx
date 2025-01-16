'use client'
import React, { useEffect, useState } from 'react'
import HeartButton from '../HeartButton';
import Image from 'next/image';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface PostCardProps {
    data: {
        postId: number;
        content: string;
        user: {
            email: string;
            name: string;
            profileImage: string | null;
            role: string;
            userId: number;
            username: string;
        };
        imageUrls: string[];
    };
}

const PostCard = ({data}:PostCardProps) => {

const [currentUser, setCurrentUser] = useState(); // 사용자 상태

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
return (
<div 
    className='col-span-1 cursor-pointer group'>
        <div className='flex flex-col w-full gap-2'>
            <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
                <Image 
                    src={data.imageUrls?.[0] || ''}
                    fill
                    sizes='auto'
                    className='object-cover w-full h-full transition group-hover:scale-110'
                    alt="product"
                />
                {currentUser?
                    <div className='absolute top-3 right-3'>
                        <HeartButton
                            currentUser={currentUser}
                            postId={data.postId}
                        />
                    </div>
                    :
                    ""
                }
            </div>
        
            <div className='text-lg font-semibold'>
                {data.content}
            </div>

            <div className='flex flex-row items-center justify-between gap-1'>
                <div>
                    {/* { dayjs(data.createdAt).format('YYYY-MM-DD') } */}
                    { }
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard