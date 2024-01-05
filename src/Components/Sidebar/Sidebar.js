import React, { useState } from 'react';
import styles from './SideBar.module.css';
import Logo from '../../Assets/Logo.jpg';
import { NavLink } from 'react-router-dom';


const SideBar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path: "/",
            name: "Dashboard"
          },
          {
            path: "/training",
            name: "Training"
          },
          {
            path: "/trainees",
            name: "Trainees"
          },
          {
            path: "/admin",
            name: "Admin"
          }
    ]
    return (
        <>
        <div className={styles.sidebar} style={{ width: isOpen ? "200px" : "50px" }}>
            <div className={styles.top_section}>
                <img style={{ display: isOpen ? "block" : "none" }} className={styles.logo} src={Logo} />
                <div style={{ marginLeft : isOpen ? "50px" : "0px" }} className={styles.bar}>
                    <div onClick={toggle}>=</div>
                </div>
            </div>
            {
          menuItem.map((items, index) => (
            <NavLink to={items.path} key={index} className= {styles.link}
            activeclassName={styles.active}>
              <div className={styles.icon}>{items.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}} className={styles.link_text}>{items.name}</div>

            </NavLink>
          )
        )}
        </div><main>{children}</main>
        </>
    
    );
};

export default SideBar;