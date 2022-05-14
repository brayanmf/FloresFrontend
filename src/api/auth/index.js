import axios from "axios";

const api = axios.create({
	withCredentials: true,
});

const url = process.env.REACT_APP_BACKEND_ENPOINT;

export const postLoginAsync = (data) => api.post(`${url}/login`, data);

export const postRegisterAsync = (data) => {
	const config = {headers: {"Content-Type": "multipart/form-data"}};

	return api.post(`${url}/register`, data, config);
};
export const postLoadAsync = () => api.get(`${url}/user/me`);
export const getLogoutAsync = () => api.get(`${url}/logout`);
