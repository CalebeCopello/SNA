import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { styleH1, styleFormBorder, styleFormItem, styleFormLabel, styleFormMessage, styleInput, styleButton, styleButton2 } from '../../constants/styles';

const formSchema = z
	.object({
		email: z.string().email({ message: 'Email is required' }).trim().toLowerCase(),
		password: z.string().min(4).max(20),
		confirmPassword: z.string().min(4).max(20),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: 'Passwords do not match', path: ['confirmPassword'] }
	);

const SignUp = () => {
	const [pageLoading, setPageLoading] = useState<boolean>(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	useEffect(() => {
		setPageLoading(false);
	}, []);

	console.log(pageLoading);

	return (
		<>
			<div className='h-screen flex items-center justify-center'>
				{pageLoading ? (
					<Skeleton className='w-[300px] h-[350px] rounded bg-color08' />
				) : (
					<div className={`flex w-[300px] ${styleFormBorder}`}>
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
								<span className='mx-auto text-textColor'>Already have an account? <Link to='/login'>LogIn</Link></span>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default SignUp;
