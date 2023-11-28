import axios from "axios";


// Set the base URL for your API (if applicable)
axios.defaults.baseURL = "http://127.0.0.1:8000";

const token = localStorage.getItem('token');


if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.interceptors.response.use(response=>{
  return response
},error=>{
  if (error.response.status === 401) {
      console.log('error')
  }
  return error;
})

export default axios;


