import React from 'react'
import Logo from "../../Assets/Logo.jpg"
import style from "./NavBar.module.css"
export default function NavBar() {
  return (
    
    <div className={style.main}>
        <div className={style.navBg}>
        <img  className={style.img} src={Logo} alt="flairminds"/>
        </div>
    </div>
  )
}
