import React from 'react'
import HeartButton from '../HeartButton';
import Image from 'next/image';

interface PostCardProps {
    data: {
        id: number;
        title: string;
        date: string;
        imageUrl: string;
        content: string;
      };
}

const PostCard = ({data}:PostCardProps) => {

  return (
<div 
    className='col-span-1 cursor-pointer group'>
        <div className='flex flex-col w-full gap-2'>
            <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
                <Image 
                    src={data.imageUrl}
                    fill
                    sizes='auto'
                    className='object-cover w-full h-full transition group-hover:scale-110'
                    alt="product"
                />
                <div className='absolute top-3 right-3'>
                <HeartButton
                    />
                </div>
            </div>
        
            <div className='text-lg font-semibold'>
                {data.title}
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