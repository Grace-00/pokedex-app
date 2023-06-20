import React, { FC } from 'react'
import './LoadingSpinner.css'

const LoadingSpinner: FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
