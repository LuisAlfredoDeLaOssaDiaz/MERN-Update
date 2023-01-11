import React, {useState} from 'react'
import {Tab} from "semantic-ui-react"
import {Icon} from "../../../assets"
import "./Auth.sass";

import { fpanes } from "./panes"
import PruebaButton from '../../../PruebaButton';

function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  const openLogin = () => setActiveIndex(0)
  return (
    <div className="auth">
      
      <PruebaButton ruta='' />

      <Icon.LogoWhite className="logo" />
      <Tab panes={fpanes(openLogin)} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}  />
    </div>
  )
}


export {
  Auth
}
