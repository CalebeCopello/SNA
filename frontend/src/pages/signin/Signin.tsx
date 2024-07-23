import { Skeleton } from '@/components/ui/skeleton';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email({message:"Email is required"}).trim().toLowerCase(),
	password: z.string().min(4, { message: "Password must be at least 4 characters long."}).max(20, { message: "Max password lenght is 20 characters long."}),
	confirmPassword: z.string().min(4, { message: "Password must be at least 4 characters long."}).max(20, { message: "Max password lenght is 20 characters long."})
});

const Signin = () => {
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
		console.log(values)
		}

	return (
		<>
			<div className='h-screen flex items-center justify-center'>
				<div className='flex w-[320px] border-2 border-color03 rounded'>
					<div className='flex w-full'>
						<h1 className='mx-auto font-YoungSerif'>LogIn</h1>
						<div className=''></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signin;
