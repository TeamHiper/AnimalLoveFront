import React from 'react'
import { IconType } from 'react-icons';

interface HeadingProps{
    title: string;
    subtitle? : string;
    center? : boolean;
    icon? : IconType;
}

const Heading = ({title, subtitle, center, icon:Icon}: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      {Icon && (
        <Icon 
          size={200}
        ></Icon>
      )}
        <div className='text-2xl font-bold '>
            {title}
        </div>
        <div className='mt-2 font-light text-neutral-500'>
            {subtitle}
        </div>
    </div>
  )
}

export default Heading