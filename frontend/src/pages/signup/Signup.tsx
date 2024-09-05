import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { GoAlertFill } from 'react-icons/go';
import { FaGoogle } from 'react-icons/fa';

import Navbar from '../../components/Navbar';
import { styleMainContainer, styleH1, styleFormBorder, styleFormItem, styleFormLabel, styleFormMessage, styleInput, styleButton, styleButton2, styleAlertError } from '../../constants/styles';

const formSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'Username must be 3 or more characters long' })
			.max(20, { message: 'Username must be at most 20 characters long' })
			.regex(/^[a-zA-Z0-9\-_]+$/, { message: 'Username can only contain letters, numbers, hyphens, and underscores' })
			.trim(),
		email: z.string().email({ message: 'Email is required' }).trim().toLowerCase(),
		password: z.string().min(4, { message: 'Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
		confirmPassword: z.string().min(4, { message: 'Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: 'Passwords do not match', path: ['confirmPassword'] }
	);

const SignUp = () => {
	const [pageLoading, setPageLoading] = useState<boolean>(true);
	const [errorForm, setErrorForm] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);

	const URL: string = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setErrorMessage(() => []);
		axios
			.post(`${URL}api/signup`, {
				username: values.username,
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				//Console Debug
				console.debug('Form Submit Succes Status:', res.data.status);
				console.debug('Form Submit Succes Json Status:', res.data.status);
				console.debug('Form Submit Succes Json Message:', res.data.message);
				setErrorForm(() => false);
				navigate('/profile');
			})
			.catch((err) => {
				setErrorForm(() => true);
				if (err.response) {
					console.error(`From Submit Error Data:`, err.response.data.errors);
					console.error(`From Submit Error Status:`, err.response.status);
					console.error(`From Submit Error Headers:`, err.response.headers);
					err.response.data.errors.forEach((error: string) => {
						setErrorMessage((prev: string[]) => [...prev, error]);
					});
				} else if (err.request) {
					console.error(`Form Submit No Response`, err.request);
				} else {
					console.error(`Form Submit Error Message`, err.message);
					setErrorMessage(() => err.response.message);
				}
				console.error(`Form Submit Error Config:`, err.config);
			});
		console.log(values);
	}

	useEffect(() => {
		setPageLoading(false);
	}, []);

	console.log(pageLoading);

	return (
		<>
			<Navbar />
			<main className={`${styleMainContainer}`}>
				{pageLoading ? (
					<Skeleton className='w-[288px] h-[350px] rounded bg-color08' />
				) : (
					<div className={`flex w-[288px] ${styleFormBorder}`}>
						<div className='flex-row w-full'>
							<h1 className={`text-center ${styleH1}`}>SignUp</h1>
							<div className=''>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='flex-row'
									>
										<FormField
											control={form.control}
											name='username'
											render={({ field }) => (
												<FormItem className={`${styleFormItem}`}>
													<FormLabel className={`${styleFormLabel}`}>Username:</FormLabel>
													<FormControl>
														<Input
															placeholder='Username'
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
										<FormField
											control={form.control}
											name='confirmPassword'
											render={({ field }) => (
												<FormItem className={`${styleFormItem}`}>
													<FormLabel className={`${styleFormLabel}`}>Confirm Password:</FormLabel>
													<FormControl>
														<Input
															placeholder='Confirm Password'
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
										<span className='ml-2 text-color01'>Use Google account</span>
									</Button>
								</div>
							</div>
							<div className='mx-2 mt-3 border-textColor/50 border-t'></div>
							<div className='mt-3 flex'>
								<span className='mx-auto text-textColor'>
									Already have an account? <Link to='/login'>LogIn</Link>
								</span>
							</div>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default SignUp;
