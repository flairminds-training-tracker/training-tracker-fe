import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/SideBar/SideBar'

export const PageLayout = () => {
  return (
    <>
    <NavBar/>
    <div className="container-fluid" >
        <div className="row">
            <div className="col-2 ms-0 me-5 p-0">
                <SideBar/>
            </div>
            <div className="col m-0 p-0">
                <Outlet/>
               
                
            </div>
        </div>
    </div>
    </>
  )
}