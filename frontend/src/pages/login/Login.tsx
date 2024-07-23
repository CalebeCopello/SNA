import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { styleH1, styleFormBorder, styleFormItem, styleFormLabel, styleFormMessage, styleInput, styleButton } from '../../constants/styles';

const formSchema = z.object({
	email: z.string().email({ message: 'Email is required' }).trim().toLowerCase(),
	password: z.string().min(4).max(20),
});

const Login = () => {
	const [pageLoading, setPageLoading] = useState<boolean>(true);

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
		console.log(values);
	}

	useEffect(() => {
		setTimeout(() => setPageLoading(false), 3300);
	}, []);

	console.log(pageLoading);

	return (
		<>
			<div className='h-screen flex items-center justify-center'>
				{pageLoading ? (<Skeleton className="w-[300px] h-[285px] rounded bg-color08" />) : (
					
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
						</div>
					</div>
				</div>
				)}
			</div>
		</>
	);
};

export default Login;
