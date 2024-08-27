import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useIsUserLogged = () => {
	const [isUserInfoloaded, setIsUserInfoloaded] = useState<boolean>(false);
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

	useEffect(() => {
		const URL: string = import.meta.env.VITE_API_URL;
		const TOKEN: string | undefined = Cookies.get('SNAAuth');
		axios
			.get(`${URL}api/user/profile`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then(() => {
				setIsUserLogged(() => true);
			})
			.catch((err) => {
				if (err.response) {
					setIsUserLogged(() => false);
				}
				setIsUserLogged(() => false);
			})
			.finally(() => {
				setIsUserInfoloaded(() => true);
			});
	}, []);
	return {isUserInfoloaded, isUserLogged};
};

export default useIsUserLogged;
