import React, { FC } from 'react'
import './button.css'

export interface ButtonProps {
  readonly icon: string
  readonly onClick: () => void
  readonly className: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <img src={props.icon} alt="icon" style={{ cursor: 'pointer' }} />
    </button>
  )
}

export default Button
