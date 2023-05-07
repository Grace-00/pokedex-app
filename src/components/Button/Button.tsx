import React, { FC } from 'react'
import './button.css'

export interface ButtonProps {
  readonly buttonName: string
  readonly onClick: () => void
  readonly className: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <label style={{cursor: 'pointer'}}>{props.buttonName}</label>
    </button>
  )
}

export default Button
