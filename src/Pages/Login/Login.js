import React, { useState,useEffect } from 'react';
import Styles from "./Login.module.css";
import Logo from '../../Assets/Logo.jpg';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from '../../Services/Api';
// import Input from '../../Components/Input.js'
export default function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await login(email, password);
      const token = response.result.token;
      localStorage.setItem("token", token);
      Cookies.set("token", token);

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  return (
    <div className={`container-fluid w-full h-full  ${Styles.con}`}>
    <div className='row '>
      <div className={` col-7 ${Styles.l}`}>
        <img src={Logo} className={Styles.logoImg} alt="logo"/>
      </div>
      <div className={` col-5  ${Styles.r}`}>
       <div className={Styles.formContainer}> 
        <div className={`mt-1  ${Styles.heading} `}>
          Login
        </div>
       
        <form  onSubmit={handleSubmit}  className={Styles.formSection}>
          <div className="form-group col-12  mb-3 d-flex flex-column">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" style={{boxShadow:'none', padding: "0.5rem 1rem"}} onChange={(e) => setEmail(e.target.value)}></input>
              {/* <Input className={Styles.pss} placeholder="Username or e-mail" style={{boxShadow:'none', padding: "0.5rem 1rem"}}/> */}
          </div>
          <div className="form-group ">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" style={{boxShadow:'none', padding: "0.5rem 1rem"}} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <br />
          <button type="submit" className= {`btn btn-primary col-12 ${Styles.btn1}`}>Submit</button>
        </form>
      </div>
      </div>
    </div>
  </div>
  )
}
