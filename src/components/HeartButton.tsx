"use client"
import useFavorite, { LikesParams } from '@/hooks/useFavorite';

import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'


const HeartButton = ({userId,postId}: LikesParams) => {
  
    const { isFavorite,toggleFavorite } = useFavorite({userId,postId});
    console.log("isFavorite : " + isFavorite)

    return (
    <div 
    onClick={toggleFavorite}
    className='relative transition cursor-pointer hover:opacity-80'>
        <AiOutlineHeart
        size={28}
        className='fill-white
        absolute -top-[2px] -right-[2px]
        '
        />
        <AiFillHeart
        size={24}
        className={isFavorite ? 'fill-rose-500': 'fill-neutral-500/70'}
        />
    </div>
  )
}

export default HeartButton