import Navbar from '@/components/Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { styleMainContainer } from '@/constants/styles';

const Profile = () => {
	const URL: string = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const TOKEN: string|undefined = Cookies.get('SNAAuth');
		console.log(TOKEN);
		axios
			.get(`${URL}api/user/profile`, {
				headers: {
					Authorization: TOKEN,
				},
			})
			.then((res) => {
				console.log(res);
			})
			.then((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<Navbar />
			<main className={`${styleMainContainer}`}>Profile</main>
		</>
	);
};
export default Profile;
