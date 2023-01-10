import React, {useState} from 'react'
import {Tab} from "semantic-ui-react"
import {Icon} from "../../../assets"
import "./Auth.sass";

import { panes } from "./panes"

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  
  const openLogin = () => setActiveIndex(0)

  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}  />
    </div>
  )
}
