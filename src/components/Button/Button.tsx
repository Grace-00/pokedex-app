import React, { FC } from 'react'
import './button.css'

export interface ButtonProps {
  readonly icon: string
  readonly onClick: () => void
  readonly className: string
  readonly disabled: boolean
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
    >
      <img src={props.icon} alt="icon" style={{ cursor: 'pointer' }} />
    </button>
  )
}

export default Button
