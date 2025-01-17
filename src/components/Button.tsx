import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?:boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon : Icon
}) => {
  return (
    <button
        type='submit'
        disabled={disabled}
        onClick={onClick}
        className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          w-full
          ${outline ? 'bg-white': 'bg-green-500'}
          ${outline ? 'border-black': 'border-green-500'}
          ${outline ? 'text-black': 'text-white'}
          ${outline ? 'text-sm': 'text-md'}
          ${outline ? 'py-1': 'py-3'}
          ${outline ? 'font-light': 'font-semibold'}
          ${outline ? 'border-[1px]': 'border-1'}        
          `}  
    >
      {Icon && (
        <Icon 
          size={24}
          className='absolute left-4 top-3'
        ></Icon>
      )}
      {label}
    </button>
  )
}

export default Button