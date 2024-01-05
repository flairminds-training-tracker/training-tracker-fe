import axios from 'axios';
import Cookies from 'js-cookie';
const NodeURL = 'https://d40vhfq2-9090.inc1.devtunnels.ms'
// const NodeURL = 'https://dfkt7wdr-9090.inc1.devtunnels.ms'


// const tokenCookie = Cookies.get('access_token');
// localStorage.setItem('token', tokenCookie);
// const access_token = localStorage.getItem('acess_token');
const loginisAdmin = localStorage.getItem("isAdmin");
const headers = {
  'Authorization': `Bearer ${Cookies.get('token')}`,
   withCredntials: true,
  credentials: 'include',
};
  
export const loginDatas = (formData) =>{
   
    const params = {
        email: formData.email,
        password: formData.password
        
    }
    
    const res = axios.post(`${NodeURL}/user/login`,params)
    
    return res

};
export const login = async (email, password) => {
  const response = await axios.post(`${NodeURL}/user/login`, {
    email: email,
    password: password
  }, {
    withCredntials: true,
    credentials: 'include',
    headers
});
 localStorage.setItem("isAdmin", response.data.is_admin);
  return response.data;
};
export const tech = async() => {
    const response = await axios.get(`${NodeURL}/tech/`, {headers});
    console.log('hhhh' , response);
    return response.data;
  };


  export const saveDataApi = async (dataToSend) => {

    const response = await axios.post(`${NodeURL}/trainingPlan/saveActivities/`, dataToSend, {
      withCredntials: true,
      credentials: 'include',
      headers
    });
    return response;
};


  export const fetchTraineeData = async () => {
    if (loginisAdmin == 1 ) {
      const response = await axios.get(`${NodeURL}/trainee/activeTraineesAdmin?activityType=active`, {
        headers
        });
        return response.data;
    } else {
      const response = await axios.get(`${NodeURL}/trainee/activeTraineesUser?activityType=active`, {
        withCredntials: true,
        credentials: 'include',
        headers
        });
        return response.data;
    }
  };

  export const addUser = async (email, password, userName) => {
    const response = await axios.post(`${NodeURL}/user/addUser/`, {
      userName: userName,
      email: email,
      password: password
    }, {
      withCredntials: true,
      credentials: 'include',
      headers
  });
    return response.data;
  };

  export const btnActivities = async (selectedTrainee, selectedTrainer, selectedTechnology) => {
    const response = await axios.post(`${NodeURL}/acti/getActivities/`, {
      traineeId: selectedTrainee,
      trainerId: selectedTrainer,
      tech_id: selectedTechnology
    }, {headers});
    return response.data;
  };
  export const trainee = async() => {
    const response = await axios.get(`${NodeURL}/trainee/`, {
      withCredntials: true,
      credentials: 'include',
      headers
  });
    return response.data;
  };
  
  export const fetchTraineeDataOld = async () => {
    if (loginisAdmin == 1 ) {
      const response = await axios.get(`${NodeURL}/trainee/activeTraineesAdmin?activityType=old`, {
        withCredntials: true,
        credentials: 'include',
        headers
        });
        return response.data;
    } else {
      const response = await axios.get(`${NodeURL}/trainee/activeTraineesUser?activityType=old`, {
        withCredntials: true,
        credentials: 'include',
        headers
        });
        return response.data;
    }
  };
  export const fetchDashboard = async () => {
    const response = await axios.get(`${NodeURL}/tech/myTraining`, {
      withCredntials: true,
      credentials: 'include',
      headers
    });
    return response.data;
  
  };

  export const fetchTraineeDataTrainingDropDown = async () => {
    const response = await axios.get(`${NodeURL}/trainee/getStatus`, {
      withCredntials: true,
      credentials: 'include',
      headers
    });
    return response.data;
  
  };
  export const fetchTraineeDataTrainingCards = async (setSelectedValue) => {
    const response = await axios.post(`${NodeURL}/trainingPlan/getTrainingActivities`, {
      "status_id": parseInt(setSelectedValue)
    }, {
      withCredntials: true,
      credentials: 'include',
      headers
    });
    return response.data;
  
  };
  
  
  