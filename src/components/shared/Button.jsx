import React from 'react'

function Button({children, type, version, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>          
        {children}
    </button>
  )
}

Button.defaultProps = {
    type: 'button',
    version: 'primary',
    isDisabled: false,

}

export default Button