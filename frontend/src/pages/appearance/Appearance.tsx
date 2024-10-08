import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import UserMenubar from '@/components/UserMenubar';
import { styleMainContainer, styleBoxBorder } from '@/constants/styles';

import Theme from '../theme/Theme';

const Appearance = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const TOKEN: string | undefined = Cookies.get('SNAAuth');
		const URL: string = import.meta.env.VITE_API_URL;

		axios
			.get(`${URL}api/user/profile`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.catch((err) => {
				if (err.response) {
					console.error(`From Submit Error Data:`, err.response.data);
					console.error(`From Submit Error Status:`, err.response.status);
					console.error(`From Submit Error Headers:`, err.response.headers);
					navigate('/login');
				} else if (err.resquest) {
					console.error(`From Submit No Response:`, err.resquest);
				} else {
					console.error(`From Submit Error Message:`, err.message);
				}
				console.log(`From Submit Error Config:`, err.config);
			});
	});

	return (
		<>
			<>
				<Navbar />
				<div className='md:flex mx-4'>
					<UserMenubar />
					<main className={`${styleMainContainer} ${styleBoxBorder} mt-1 md:mt-0 md:ml-1 w-full`}>
						<Theme />
					</main>
				</div>
			</>
		</>
	);
};

export default Appearance;
