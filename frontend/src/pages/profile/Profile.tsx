import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import Navbar from '@/components/Navbar';
import { styleMainContainer, styleBoxBorder, styleH1 } from '@/constants/styles';

import UserMenubar from '@/components/UserMenubar';

// import useIsLogged from '../../hooks/useIsLogged';

interface userInfo {
	username: string;
	avatar: string;
	email: string;
	theme: string;
	created_at: string;
}

const Profile = () => {
	const [userInfo, setUserInfo] = useState<userInfo | null>(null);

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
				} else if (err.resquest) {
					console.error(`From Submit No Response:`, err.resquest);
				} else {
					console.error(`From Submit Error Message:`, err.message);
				}
				console.log(`From Submit Error Config:`, err.config);
			});
	}, []);
	return (
		<>
			<Navbar />

			<div className='md:flex mx-4'>
				<UserMenubar />
				<main className={`${styleMainContainer} ${styleBoxBorder} mt-1 md:mt-0 md:ml-1 w-full`}>
					<div className='flex-row w-full h-full p-3'>
						<div className='mb-2'>
							<h1 className={`${styleH1}`}>Profile:</h1>
							<p className='text-sm'>Check your account information</p>
							<div className={`rounded bg-textColor/30 h-[2px] mt-1 mb-5`}></div>
						</div>
						<div className='flex-col max-w-2xl'>
							<div className='flex mb-5'>
								<img
									src={`imgs/avatars/${userInfo?.avatar}`}
									alt='avatar'
									className={`${styleBoxBorder} h-10 md:h-24 rounded-full`}
								/>
								<div className='my-auto ml-3 text-xl font-semibold'>{userInfo?.username}</div>
							</div>
							<div className='flex'>
								<span className='mr-2'>Email:</span>
								<div className=''>{userInfo?.email}</div>
							</div>
							<div className='flex'>
								<span className='mr-2'>Theme:</span>
								<div className=''>{userInfo?.theme}</div>
							</div>
							<div className='flex'>
								<span className='mr-2'>Created at:</span>
								<div className=''>{userInfo?.created_at}</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
export default Profile;
