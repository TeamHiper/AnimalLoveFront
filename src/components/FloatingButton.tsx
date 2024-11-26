import Link from 'next/link'
import React from 'react'


interface FloatingButtonProps {
    children : React.ReactNode;
    href: string;
}

// children = +
const FloatingButton = ({children,href }:FloatingButtonProps) => {
  return (
    <Link href={href}
    className='fixed flex items-center justify-center bg-green-600 text-white border-0
     bottom-5 right-5 w-14  border-transparent rounded-full shadow-xl cursor-pointer aspect-square hover:bg-green-800 transition-colors'
    >{children}</Link>
  )
}

export default FloatingButton