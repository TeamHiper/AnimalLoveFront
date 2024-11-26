import useFavorite from '@/hooks/useFavorite';

import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const HeartButton = () => {
  
    //const {hasFavorite, toggleFavorite } = useFavorite();

    return (
    <div 
   // onClick={toggleFavorite}
    className='relative transition cursor-pointer hover:opacity-80'>
        <AiOutlineHeart
        size={28}
        className='fill-white
        absolute -top-[2px] -right-[2px]
        '
        />
        <AiFillHeart
        size={24}
        className={true ? 'fill-rose-500': 'fill-neutral-500/70'}
        />
    </div>
  )
}

export default HeartButton