import React from 'react';
import logo from "../../Assest/Logo.jpg";
import stylesNav from "./Navbar.module.css";
const Navbar = () => {
	return (
		<div className={stylesNav.h2Div}>
			<div className={stylesNav.imgContainer}>
				<img src={logo} alt="Flairminds Logo" className={stylesNav.img}></img>
			</div>
			<div className={stylesNav.heading}></div>
			<h2 className={stylesNav.h2}>Flair Minds-Training Tracker Platform</h2>
		</div>
	);
};

export default Navbar;
