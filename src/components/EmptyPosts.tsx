'use client'

import React from 'react'
import Heading from './Heading';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { FaBone } from "react-icons/fa6";

interface EmptyPostsProps {
  title? : string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyPosts = ({
    title = '앗! 찾으시는 글이 아직 없네요',
    subtitle = '',
    showReset
}: EmptyPostsProps) => {

  const router = useRouter();

  return (
    <div
      className='h-[60vh]
      flex
      flex-col
      gap-2
      justify-center
      items-center'
    >
      <div className='w-48 mt-4'>
      <Heading
        center
        title={title}
        subtitle={subtitle}
        icon={FaBone}
      />
      </div>
    </div>
  )
}

export default EmptyPosts