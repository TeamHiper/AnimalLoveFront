
import Link from 'next/link';
import React,{useState} from 'react'
import { IconType } from 'react-icons'
import Button from '../Button';

interface CategoryBoxProps {
  icon : IconType;
  label: string;
  path: string;
  selected?: boolean;
}

const CategoryBox = ({
  icon : Icon,
  label,
  path,
  selected
}:CategoryBoxProps) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>, label: string): void => {
    console.log('handleMenu');
    setIsPopupVisible(!isPopupVisible);  // 상태를 토글
  }

  return (
    <div className='space-y-5'>

    <button onClick={(event) => handleMenu(event, label)} className='flex items-center border border-slate-400 bg-transparent rounded-full font-semibold text-slate-400 text-lg px-4 py-2'>
      <div className='pr-4'>{label}</div>
      <Icon size={24}></Icon>
    </button>
    {isPopupVisible && (
      <div className='max-w-[900px] w-[70%] absolute z-10 p-8 left-0 rounded-[30px] border-2 border-gray-300 bg-white'>
        팝업
      </div>
    )}
    </div>
  )
}

export default CategoryBox