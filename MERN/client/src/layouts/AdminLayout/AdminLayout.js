import React from 'react'
import PruebaButton from '../../PruebaButton';

export function AdminLayout(props) {
    const {children} = props;
  return (
    <div>
      <PruebaButton ruta='' />
        <h2>Se esta usando el AdminLayout</h2>
        {children}
    </div>
  )
}
