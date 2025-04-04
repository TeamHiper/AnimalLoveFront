import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children} : ContainerProps) => {
  return (
    <div
        className='
        max-w-[1500px]
        mx-auto
        xl:px-20
        md:px-10
        sm:px-2
        px-4
        py-6
        '
    >{children}
    </div>
  )
}

export default Container