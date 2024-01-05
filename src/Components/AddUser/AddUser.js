
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../Services/Api';
import { Input } from '../Input/Input';
import stylesAU from './AddUser.module.css';
import  Button  from '../Button/Button.js';
const AddUser = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUser(email, password, userName);

      console.info('Response Data:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className={stylesAU.mainContainer}>
      <form className={stylesAU.formContainer} onSubmit={handleSubmit}>
        <div className={stylesAU.baap}>
          <Input label="User Name:" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div className={stylesAU.baap}>
          <Input label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className={stylesAU.baap}>
          <Input label="Password:" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className={stylesAU.baap}>
			<Input label="Is Admin:" type="checkbox" value={isAdmin} onChange={handleAdminToggle}/>
        </div>
        <Button type="submit" className={stylesAU.button} > Add User </Button>
      </form>
    </div>
  );
};

export default AddUser;
