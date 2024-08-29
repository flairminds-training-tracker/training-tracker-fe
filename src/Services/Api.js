import axios from 'axios';
// import Cookies from 'js-cookie';
// const NodeURL = 'http://localhost:9090';

// const NodeURL = 'https://d40vhfq2-9090.inc1.devtunnels.ms';
const NodeURL = "https://training-tracker-be.vercel.app"
;
//Production server
// const NodeURL = 'https://7x5wt80g-9090.inc1.devtunnels.ms'; //for learning space

// const NodeURL = 'https://fc10m5q8-9091.inc1.devtunnels.ms';
// const loginisAdmin = localStorage.getItem("is_admin");
const loginisAdmin = localStorage.getItem("adminToken");
// const headers = {
// 	'authorization': `Bearer ${localStorage.getItem('token')}`,
// 	withCredntials: true,
// 	credentials: 'include'
// };
export const loginDatas = (formData) => {
	const params = {
		email: formData.email,
		password: formData.password
	};
	return axios.post(`${NodeURL}/user/login`, params);
};

export const login = async (email, password) => {
	const response = await axios.post(`${NodeURL}/user/login`, {
		email: email,
		password: password
	});
	return response.data;
};

export const tech = async() => {

	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};

	const response = await axios.get(`${NodeURL}/tech/`, { headers });
	return response.data;
};

export const saveActivities = async (dataToSend) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};

	const response = await axios.post(`${NodeURL}/trainingPlan/saveActivities/`, dataToSend, { headers });
	return response;
};

// Review: create two separate functions call based on checking admin in the page, not here
export const fetchTraineeDataActiveAdmin = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredentials: true,
		credentials: 'include'
	};
	console.info(loginisAdmin, "checking if admin is log in ");
	// const endpoint = loginisAdmin == 1 ? 'activeTraineesAdmin' : 'activeTraineesUser';
	// const endpoint = loginisAdmin !== 1 ? 'activeTraineesAdmin' : 'activeTraineesUser';
	const response = await axios.get(`${NodeURL}/trainee/activeTraineesAdmin?activityType=active`, { headers });
	return response.data;
};

// Review: create two separate functions call based on checking admin in the page, not here
export const fetchTraineeDataOldAdmin = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredentials: true,
		credentials: 'include'
	};
	const response = await axios.get(`${NodeURL}/trainee/activeTraineesAdmin?activityType=old`, { headers });
	return response.data;
};
export const fetchTraineeDataActiveUser = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredentials: true,
		credentials: 'include'
	};
	console.info(loginisAdmin, "checking if admin is log in ");

	const response = await axios.get(`${NodeURL}/trainee/activeTraineesUser?activityType=active`, { headers });
	return response.data;
};
export const fetchTraineeDataOldUser = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredentials: true,
		credentials: 'include'
	};
	const response = await axios.get(`${NodeURL}/trainee/activeTraineesUser?activityType=old`, { headers });
	return response.data;
};

export const addUser = async (email, password, userName) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const response = await axios.post(`${NodeURL}/user/addUser`, {
		'user_name': userName,
		email: email,
		password: password
	}, { headers });
	return response.data;
};

export const getActivities = async (selectedTrainee, selectedTrainer, selectedTechnology) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const response = await axios.post(`${NodeURL}/acti/getActivities`, {
		traineeId: selectedTrainee,
		"trainer_id": selectedTrainer,
		"tech_id": selectedTechnology
	}, { headers });
	return response.data;
};

export const trainee = async() => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const response = await axios.get(`${NodeURL}/trainee/`, { headers });
	return response.data;
};

export const fetchDashboard = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const response = await axios.get(`${NodeURL}/tech/myTraining`, { headers });
	return response.data;
};

export const fetchTraineeDataTrainingDropDown = async () => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const response = await axios.get(`${NodeURL}/trainee/getStatusWithAll`, { headers });
	return response.data;
};

export const fetchTraineeDataTrainingCards = async (setSelectedValue) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredentials: true,
		credentials: 'include'
	};
	const response = await axios.post(`${NodeURL}/trainingPlan/getTrainingActivities`, {
		"status_id": parseInt(setSelectedValue)
	}, { headers });
	return response.data;
};

export const getCourse = () => {
	// const headers={

	// };
	const response = axios.get(`${NodeURL}/tech/getCourses`);
	return response;
};

export const postCourse = (courseData) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const params = {
		technology: courseData.technology,
		image: courseData.image,
		description: courseData.description
	};
	return axios.post(`${NodeURL}/tech/addNewCourse`, params, {headers});
};
export const getTopic = (id) => {
	const response = axios.get(`${NodeURL}/tech/getTopics/${id}`);
	return response;
};
export const editTopic = async (editData) => {
	try {
		const response = await axios.put(
			`${NodeURL}/tech/editTopic/${editData.get('tech_topic_id')}`,
			editData, // This should be FormData
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'authorization': `Bearer ${localStorage.getItem('token')}`
				},
				withCredentials: true
			}
		);
		return response;
	} catch (error) {
		console.error('Error in editTopic API:', error);
		throw error;
	}
};
export const updateStatusForTopic = (statusData ) => {
	const params = {
		// id: statusData.id,
		status: statusData.status
	};
	const response = axios.put(`${NodeURL}/tech/updateStatus/${statusData.id}`, params);
	return response;
};
// export const postNewTopic = async (postData) => {
// 	try {
// 		const params = {
// 			id: postData.ids,
// 			topic: postData.topic,
// 			article: postData.article,
// 			youtube: postData.youtube,
// 			practice: postData.practice
// 		};
// 		const response = axios.post(`${NodeURL}/tech/addNewTopic/${postData.ids}`, params, {headers: {
// 			'Content-Type': 'multipart/form-data'
// 		}});
// 		return response;
// 	} catch (error) {
// 		console.error('Error in addNewTopic API:', error);
// 		throw error;
// 	}

// };
export const postNewTopic = async (postData) => {
	try {
		const response = await axios.post(
			`${NodeURL}/tech/addNewTopic/${postData.get('ids')}`,
			postData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'authorization': `Bearer ${localStorage.getItem('token')}`,
					withCredntials: true,
					credentials: 'include'
				}
			}
		);
		return response;
	} catch (error) {
		console.error('Error in addNewTopic API:', error);
		throw error;
	}
};

export const uploadDoc = async (formData) => {
	try {
		const response = await axios.put(`${NodeURL}/tech/uploadAssignment/${formData.get('tech_topic_id')}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response;
	} catch (error) {
		console.error('Error in uploadDoc API:', error);
		throw error;
	}
};
export const deleteData = (id) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};

	return axios.delete(`${NodeURL}/tech/deleteTopic/${id}`, {headers});
};
export const addSession = (addData) => {
	const headers = {
		'authorization': `Bearer ${localStorage.getItem('token')}`,
		withCredntials: true,
		credentials: 'include'
	};
	const param = {
		sessionUrl: addData.sessionUrl,
		name: addData.name,
		date: addData.date,
		speaker: addData.speaker,
		tagsJson: addData.tagsJson
	};
	const response = axios.post(`${NodeURL}/tech/addSessions`, {param}, {headers});
	return response;
};