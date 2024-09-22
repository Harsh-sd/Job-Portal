import React from 'react'

function Button({
    children,
    type='button' , 
    bgColor='black',
    textColor='white',
    className='',
    ...props
}) {
   
   

    return (
        <button
          type={type}
          className={`px-4 py-2 ${bgColor} ${textColor} ${className}`}
          {...props}
        >
          {children}
        </button>
      );
}

export default Button