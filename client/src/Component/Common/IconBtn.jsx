import React from 'react'

const IconBtn = ({ ...btnData }) => {
  const { children, text, onClick, onClickHandler, disabled, outline = false, customClasses, type } = btnData;

  return (
    <button
      onClick={onClick || onClickHandler}
      disabled={disabled}
      type={type}
      className={`text-white ${customClasses} rounded-md py-1 px-2 font-semibold text-richblack-900 uppercase tracking-wider
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${outline ? 'border border-yellow-50 bg-transparent' : 'bg-yellow-50'}
      `}
    >
      {
        children ?
          (
            <div className={`flex items-center gap-x-2 
            ${outline && 'text-yellow-50'}
            `} >
              {text}
              {children}
            </div>
          )
          :
          (<div>{text}</div>)
      }
    </button>
  )
}

export default IconBtn