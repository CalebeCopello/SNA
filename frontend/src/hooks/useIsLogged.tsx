import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useIsLogged = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [logged, setLogged] = useState<boolean>(false);

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
				setLogged(() => true);
			})
			.catch((err) => {
				if (err.response) {
					setLogged(() => false);
				}
				setLogged(() => false);
			})
			.finally(() => {
				setLoaded(() => true);
			});
	}, []);
	return {loaded, logged};
};

export default useIsLogged;
