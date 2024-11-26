'use client';

import React from 'react'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {GiBoatFishing, GiIsland, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {FaSkiing} from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import CategoryBox from './CategoryBox'
import { BiSearchAlt2 } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

export const categories = [
    {
        label: '기술스텍',
        path: 'digital',
        icon: BsChevronDown,
        description: '디지털기기 카테고리입니다'
    },
    {
        label: '포지션',
        path: 'application',
        icon: BsChevronDown,
        description: '생활가전 카테고리입니다'
    },
    {
        label: '진행방식',
        path: 'interior',
        icon: BsChevronDown,
        description: '가구/인테리어 카테고리입니다'
    },
    {
        label: '북마크보기',
        path: 'woman-clothing',
        icon: BsChevronDown,
        description: '여성의류 카테고리입니다'
    }

]

const Categories = () => {

    // 카테고리 값 가져오기
    const params = useSearchParams();
    const category = params?.get('category')

  return (
    <div
        className='flex max-w-[1200px] h-[300px] relative flex-row items-center py-10 pt-4 overflow-x-auto justify-between'
    >
        {categories.map((item) => (
            <CategoryBox
                key={item.label}
                label={item.label}
                path={item.path}
                icon={item.icon}
                selected={category === item.path}
            />
        ))}
        
        <div className='flex items-center w-72 bg-slate-300 h-10 rounded-full p-3'>
            <BiSearchAlt2 className='px-1' size={35}/>
            <input className='bg-transparent border-none cursor-pointer p-0 text-[16px] outline-none'
            placeholder='제목,글 내용을 검색해보세요.'>
            </input>
        </div>
    </div>
  )
}

export default Categories