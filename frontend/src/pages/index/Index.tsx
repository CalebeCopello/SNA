import Navbar from "@/components/Navbar";

import { styleMainContainer } from "@/constants/styles";

const Index = () => {
	return (
		<>
			<Navbar />
			<main className={`${styleMainContainer}`}>
				<h1 className='text-3xl font-bold underline font-JetBrainsMono text-textColor'>Hello world!</h1>
			</main>
		</>
	);
};

export default Index;
