import React, { FC, ReactElement } from 'react'
import './button.css'
export interface ButtonProps {
  readonly icon: ReactElement
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
      {props.icon}
    </button>
  )
}

export default Button
