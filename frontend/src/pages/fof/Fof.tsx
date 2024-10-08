import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import { styleMainContainer } from '@/constants/styles';

const Fof = () => {
    const cat:number = Math.floor(Math.random() * (3) + 1);
    console.log(cat)
	return (
		<>
			<Navbar />
			<main className={`${styleMainContainer}`}>
				<div className='flex-row'>
                    <h1 className='text-textColor text-center text-3xl font-bold'>404</h1>
					<h2 className='text-textColor text-center'>You seems lost</h2>
					<h2 className='text-textColor text-center'>
						Why don't you go <Link to='/' className='font-bold'>Home</Link>?
					</h2>
					<img
                    className='w-[400px] border-2 border-textColor rounded-3xl shadow-lg mt-4 bg-color05/30'
						src={`/imgs/404/freepik_cat_${cat}.png`}
						alt='a cat lost'
					/>
				</div>
			</main>
		</>
	);
};

export default Fof;
