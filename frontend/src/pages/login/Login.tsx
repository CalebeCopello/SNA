import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { FaGoogle } from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go';

import Navbar from '../../components/Navbar';
import { styleMainContainer, styleH1, styleFormBorder, styleFormItem, styleFormLabel, styleFormMessage, styleInput, styleButton, styleButton2, styleAlertError } from '../../constants/styles';

const formSchema = z.object({
	email: z.string().email({ message: 'Email is required' }).trim().toLowerCase(),
	password: z.string().min(4).max(20),
});

const Login = () => {
	const [pageLoading, setPageLoading] = useState<boolean>(true);
	const [errorForm, setErrorForm] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const URL: string = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		axios
			.post(`${URL}api/login`, {
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				//Console Debug
				// console.debug(`Form Submit Success Status:`, res.data.status);
				// console.debug(`Form Submit Success Json Status:`, res.data.status);
				// console.debug(`Form Submit Success Json Message:`, res.data.message);
				// console.debug(`Form Submit Success Json Token:`, res.data.token);
				setErrorForm(() => false);
				const TOKEN: string = `Bearer ${res.data.token}`;
				Cookies.set('SNAAuth', TOKEN, { sameSite: 'strict', expires: 365 });
				navigate('/profile');
				console.log(`okay`);
			})
			.catch((err) => {
				setErrorForm(() => true);
				if (err.response) {
					console.error(`From Submit Error Data:`, err.response.data);
					console.error(`From Submit Error Status:`, err.response.status);
					console.error(`From Submit Error Headers:`, err.response.headers);
					setErrorMessage(() => err.response.data.message);
				} else if (err.resquest) {
					console.error(`From Submit No Response:`, err.resquest);
				} else {
					console.error(`From Submit Error Message:`, err.message);
					setErrorMessage(() => err.message);
				}
				console.log(`From Submit Error Config:`, err.config);
			});
	}

	useEffect(() => {
		setPageLoading(false);
	}, []);

	return (
		<>
			<Navbar />
			<div className={`${styleMainContainer}`}>
				{pageLoading ? (
					<Skeleton className='w-[300px] h-[350px] rounded bg-color08' />
				) : (
					<div className={`flex w-[300px] ${styleFormBorder}`}>
						<div className='flex-row w-full'>
							<h1 className={`text-center ${styleH1}`}>LogIn</h1>
							<div className=''>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='flex-row'
									>
										<FormField
											control={form.control}
											name='email'
											render={({ field }) => (
												<FormItem className={`${styleFormItem}`}>
													<FormLabel className={`${styleFormLabel}`}>Email:</FormLabel>
													<FormControl>
														<Input
															placeholder='Email'
															className={`${styleInput}`}
															{...field}
														/>
													</FormControl>
													<FormMessage className={`${styleFormMessage}`} />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='password'
											render={({ field }) => (
												<FormItem className={`${styleFormItem}`}>
													<FormLabel className={`${styleFormLabel}`}>Password:</FormLabel>
													<FormControl>
														<Input
															placeholder='Password'
															className={`${styleInput}`}
															type='password'
															{...field}
														/>
													</FormControl>
													<FormMessage className={`${styleFormMessage}`} />
												</FormItem>
											)}
										/>
										<div className='flex flex-col items-center'>
											<Button
												className={`${styleButton} mt-3`}
												type='submit'
											>
												Submit
											</Button>
										</div>
									</form>
								</Form>
								<div className=''>
									{errorForm && (
										<Alert className={`mt-3 ${styleAlertError}`}>
											<GoAlertFill className='text-color02' />
											<AlertTitle className='text-textColor'>Error</AlertTitle>
											<AlertDescription className='text-textColor'>{errorMessage}</AlertDescription>
										</Alert>
									)}
								</div>
								<div className='mt-3 mx-2 flex'>
									<div className='self-center border-textColor/50 border-t w-full'></div>
									<span className='mx-2 text-textColor flex-grow-1'>or</span>
									<div className='self-center border-textColor/50 border-t w-full'></div>
								</div>
								<div className='mt-3 flex'>
									<Button className={`mx-auto ${styleButton2}`}>
										<FaGoogle className='text-color01' />
										<span className='ml-2'>Use Google account</span>
									</Button>
								</div>
								<div className='mx-2 mt-3 border-textColor/50 border-t'></div>
								<div className='mt-3 flex'>
									<span className='mx-auto text-textColor'>
										Do not have an account? <Link to='/signup'>SignUp</Link>
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Login;
