import React from 'react'
import PruebaButton from '../../PruebaButton';

export function ClientLayout(props) {
    const {children} = props;
  return (
    <div>
      <PruebaButton ruta='admin' />
        <h2>Se esta usando el ClientLayout</h2>
        {children}
    </div>
  )
}
