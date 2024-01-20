
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from "../../Components/Button/CustomButton";
import { Input } from '../../Components/Input/Input';
import { addUser } from '../../Services/Api';
import stylesAU from './AddUser.module.css';

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
			console.info('Response Data:', response.status);
			if (response.success == true) {
				alert("success, User successfully added !");
				navigate('/allocateTraining');
			} else {
				alert("fail, User is already added !");
				navigate('/addUser');
			}
			// console.info('Response Data:', response.data);
			// alert("success");
			// navigate('/');
		} catch (error) {
			console.error('Error posting data:', error);
			// alert("fail, User is already added !");
			navigate('/addUser');
		}
	};

	return (
		<div className={stylesAU.mainContainer}>
			<div className={stylesAU.outerContainer}>
				<form onSubmit={handleSubmit}>
					<h3 className={stylesAU.title}>Add User</h3>
					<div className={stylesAU.inputBoxes} >
						<div className={stylesAU.enterUserName}>
							<table className={stylesAU.table}>
								<tr>
									<td style={{textAlign: 'right'}}>Username:</td>
									<td className={stylesAU.enterUserName}>
										<Input type="text" id={'UserId'} value={userName} onChange={(e) => setUserName(e.target.value)}/>
									</td>
								</tr>
								<tr>
									<td style={{textAlign: 'right'}}>Email:</td>
									<td className={stylesAU.enterEmail}>
										<Input type="email" id={'emailId'} value={email} onChange={(e) => setEmail(e.target.value)}/>
									</td>
								</tr>
								<tr>
									<td style={{textAlign: 'right'}}>Password:</td>
									<td className={stylesAU.enterPassword}>
										<Input type="password" id={'paswordId'} value={password} onChange={(e) => setPassword(e.target.value)}/>
									</td>
								</tr>
							</table>
						</div>
						<div className={stylesAU.conformAdmin}>
							<Input label="Is Admin:" type="checkbox" value={isAdmin} onChange={handleAdminToggle} />
						</div>
					</div>
					<CustomButton type="submit" onClick={handleSubmit}> Add User </CustomButton>
				</form>
			</div>
		</div>
	);
};

export default AddUser;