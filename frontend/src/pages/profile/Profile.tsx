import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import { styleMainContainer, styleBoxBorder } from '@/constants/styles';
import UserMenubar from '@/components/UserMenubar';

// import useIsLogged from '../../hooks/useIsLogged';

interface userInfo {
	username: string;
	avatar: string;
	email: string;
	created_at: string;
}

const Profile = () => {
	const [userInfo, setUserInfo] = useState<userInfo | null>(null);

	const navigate = useNavigate();

	// const { loaded, logged } = useIsLogged();
	// console.log(loaded, logged);
	useEffect(() => {
		const URL: string = import.meta.env.VITE_API_URL;
		const TOKEN: string | undefined = Cookies.get('SNAAuth');
		axios
			.get(`${URL}api/user/profile`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then((res) => {
				//Console Debug
				// console.debug(`Form Submit Success Status:`, res.data.status);
				// console.debug(`Form Submit Success Json Status:`, res.data.status);
				// console.debug(`Form Submit Success Json Message:`, res.data.message);
				// console.debug(`Form Submit Success Json Token:`, res.data.token);
				setUserInfo(() => res.data);
				console.log(res.data);
			})
			.catch((err) => {
				if (err.response) {
					console.error(`From Submit Error Data:`, err.response.data);
					console.error(`From Submit Error Status:`, err.response.status);
					console.error(`From Submit Error Headers:`, err.response.headers);
					// navigate('/login');
				} else if (err.resquest) {
					console.error(`From Submit No Response:`, err.resquest);
				} else {
					console.error(`From Submit Error Message:`, err.message);
				}
				console.log(`From Submit Error Config:`, err.config);
			});
	}, [navigate]);
	return (
		<>
			<Navbar />

			<div className='flex mx-4'>
				<UserMenubar />
				<main className={`${styleMainContainer} ${styleBoxBorder} ml-1 w-full`}>
					Profile:
					<div className=''>{userInfo?.username}</div>
					<div className=''>{userInfo?.avatar}</div>
					<div className=''>{userInfo?.email}</div>
					<div className=''>{userInfo?.created_at}</div>
				</main>
			</div>
		</>
	);
};
export default Profile;
