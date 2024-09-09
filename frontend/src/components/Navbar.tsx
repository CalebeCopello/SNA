import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

import useIsUserLogged from '../hooks/useIsUserLogged';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { MdHome, MdMail } from 'react-icons/md';
import { IoLogIn, IoSettingsSharp, IoLogOut, IoMenu } from 'react-icons/io5';
import { FaUserPen, FaMagnifyingGlass } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';

import { styleMenuButton, styleBoxBorder, styleInput, styleButton } from '../constants/styles';

const Navbar = () => {
	const { isUserInfoloaded, isUserLogged } = useIsUserLogged();
	const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const query: string = e.target.searchTerm.value;
		if (query == '') return;
		navigate(`/search/?query=${query}&page=1`);
		console.log(e.target.searchTerm.value);
	};

	return (
		<>
			<div className={`${styleBoxBorder} mx-4 my-1 p-2 flex`}>
				<div className=' w-full flex relative self-center h-8'>
					<NavigationMenu className='flex'>
						<Sheet>
							<SheetTrigger>
								<IoMenu className={`${styleMenuButton} text-textColor h-[30px] w-[30px] hover:text-color01`} />
							</SheetTrigger>
							<SheetContent
								side='left'
								className={`rounded-r-xl`}
							>
								<SheetHeader>
									<SheetTitle>Menu</SheetTitle>
								</SheetHeader>
								<NavLink
									to='/'
									className={({ isActive }) => {
										return isActive ? 'text-color01' : 'text-textColor ';
									}}
								>
									<div className={`${styleMenuButton} mb-1`}>
										<MdHome className='inline mr-2 ml-1' />
										Home
									</div>
								</NavLink>
								<NavLink
									to='/contact'
									className={({ isActive }) => {
										return isActive ? 'text-color01' : 'text-textColor ';
									}}
								>
									<div className={`${styleMenuButton}`}>
										<MdMail className='inline mr-2 ml-1' />
										Contact
									</div>
								</NavLink>
							</SheetContent>
						</Sheet>
						<div className=''>
							<NavLink to='/'>
								<svg
									version='1.0'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 750.000000 860.000000'
									className='fill-textColor h-[30px] w-[30px]'
								>
									<g transform='translate(0.000000,860.000000) scale(0.100000,-0.100000)'>
										<path d='M1818 7557 l-1817 -1042 0 -2225 -1 -2225 1797 -1030 1797 -1030 131 -3 130 -2 1820 1044 1820 1044 3 2200 2 2200 -1841 1056 -1842 1056 -91 0 -91 -1 -1817 -1042z m3667 -251 l1750 -1004 0 -2013 0 -2013 -1750 -1003 c-962 -552 -1755 -1002 -1762 -1001 -6 2 -797 453 -1757 1003 l-1745 1000 2 2015 2 2015 1745 1002 c960 551 1750 1002 1755 1002 6 1 798 -451 1760 -1003z' />
										<path d='M3936 6153 c-3 -912 -10 -1705 -15 -1763 -13 -149 -32 -251 -42 -225 -5 11 -27 175 -49 365 -23 190 -54 440 -70 555 -29 209 -47 356 -160 1355 -33 289 -73 631 -89 760 -17 129 -37 314 -47 410 -9 96 -20 179 -24 184 -8 8 -210 -103 -385 -213 l-90 -56 -6 -280 c-4 -154 -7 -1613 -8 -3241 l-1 -2961 218 -126 c242 -140 289 -164 299 -154 3 4 12 796 19 1760 7 963 16 1782 20 1820 4 37 11 67 15 67 5 0 9 -3 9 -7 0 -5 27 -186 60 -403 88 -577 106 -705 129 -910 12 -102 35 -295 51 -430 31 -250 134 -1152 150 -1315 5 -49 14 -175 20 -280 13 -241 18 -285 36 -292 8 -3 83 34 167 83 84 48 191 110 240 137 l87 49 0 3249 0 3248 -102 57 c-57 31 -166 92 -243 135 -77 44 -149 79 -161 79 l-22 0 -6 -1657z' />
										<path d='M2354 7194 c-38 -21 -269 -150 -514 -289 -245 -138 -584 -329 -755 -425 -413 -230 -508 -286 -531 -311 -18 -20 -19 -53 -19 -1083 l0 -1061 673 -6 c370 -4 676 -10 680 -14 9 -9 9 -1711 0 -1720 -11 -12 -65 18 -1132 614 -110 61 -203 111 -208 111 -16 0 -19 -52 -16 -330 l3 -285 260 -143 c143 -79 409 -228 590 -332 182 -103 413 -234 515 -290 102 -56 258 -145 347 -196 89 -52 168 -94 176 -94 9 0 17 15 21 38 3 20 6 738 6 1594 0 1490 -1 1558 -18 1567 -11 6 -280 11 -679 13 -364 2 -665 7 -670 11 -10 10 -17 1135 -8 1225 l7 62 91 54 c194 114 590 338 670 379 31 17 61 27 65 23 4 -4 8 -286 10 -627 l3 -619 265 0 264 0 0 1085 c0 904 -2 1085 -13 1085 -8 0 -45 -16 -83 -36z' />
										<path d='M4970 4633 c0 -1429 3 -2757 7 -2951 6 -351 6 -352 27 -346 24 7 363 199 443 250 l52 33 3 1190 c2 654 7 1193 11 1198 11 11 813 11 824 0 4 -5 9 -421 11 -925 1 -504 4 -927 7 -939 3 -13 12 -23 20 -23 15 0 203 99 390 207 l120 69 3 1769 c2 974 0 1825 -3 1892 l-7 122 -156 89 c-130 74 -667 374 -962 537 -41 23 -160 90 -265 150 -366 208 -489 275 -507 275 -17 0 -18 -104 -18 -2597z m992 1431 c141 -78 282 -160 315 -181 l58 -38 6 -140 c4 -77 7 -366 8 -642 l1 -502 -46 -7 c-61 -9 -781 0 -791 10 -10 10 -17 1597 -8 1684 l7 63 96 -52 c54 -29 212 -116 354 -195z' />
									</g>
								</svg>
							</NavLink>
						</div>
						{isUserInfoloaded && isUserLogged ? (
							<>
								<div className='md:absolute md:ml-20 w-[520px]'>
									<div className='flex w-full '>
										<div className='md:mx-auto md:w-[500px]'>
											<FaMagnifyingGlass
												className={`flex md:hidden ${styleMenuButton} mt-[1px] text-[30px] text-textColor h-[30px] w-[30px] hover:text-color01 hover:cursor-pointer`}
												onClick={() => setShowSearchInput(!showSearchInput)}
											/>
											<div className='hidden md:flex'>
												<form
													onSubmit={handleSubmitSearch}
													className='flex w-full'
												>
													<Input
														type='text'
														placeholder='Type a series, movie, or artist'
														name='searchTerm'
														className={`${styleInput} max-w-lg my-auto h-8`}
													></Input>
													<Button
														type='submit'
														className={`${styleButton} ml-2 h-[30px]`}
													>
														<FaMagnifyingGlass className='mr-2' />
														Search
													</Button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							''
						)}
						<div className='flex absolute right-0 top-0'>
							{isUserInfoloaded ? (
								isUserLogged ? (
									<Sheet>
										<SheetTrigger>
											<CgProfile className={`${styleMenuButton} mt-[1px] text-textColor h-[30px] w-[30px] hover:text-color01`} />
										</SheetTrigger>
										<SheetContent
											side='right'
											className={`rounded-l-xl`}
										>
											<SheetHeader>
												<SheetTitle>User Menu</SheetTitle>
											</SheetHeader>
											<NavLink
												to='/profile'
												className={({ isActive }) => {
													return isActive ? 'text-color01' : 'text-textColor ';
												}}
											>
												<div className={`${styleMenuButton} mb-1`}>
													<IoSettingsSharp className='inline mr-2 ml-1' />
													Settings
												</div>
											</NavLink>
											<NavLink
												to='/logout'
												className={({ isActive }) => {
													return isActive ? 'text-color01' : 'text-textColor ';
												}}
											>
												<div className={`${styleMenuButton} `}>
													<IoLogOut className='inline mr-2 ml-1' />
													LogOut
												</div>
											</NavLink>
										</SheetContent>
									</Sheet>
								) : (
									<>
										<Sheet>
											<SheetTrigger>
												<CgProfile className={`${styleMenuButton} text-textColor h-[30px] w-[30px] hover:text-color01`} />
											</SheetTrigger>
											<SheetContent
												side='right'
												className={`rounded-l-xl`}
											>
												<SheetHeader>
													<SheetTitle>User Menu</SheetTitle>
												</SheetHeader>
												<NavLink
													to='/login'
													className={({ isActive }) => {
														return isActive ? 'text-color01' : 'text-textColor ';
													}}
												>
													<div className={`${styleMenuButton} mb-1`}>
														<IoLogIn className='inline mr-2 ml-1' />
														Log In
													</div>
												</NavLink>
												<NavLink
													to='/signup'
													className={({ isActive }) => {
														return isActive ? 'text-color01' : 'text-textColor ';
													}}
												>
													<div className={`${styleMenuButton}`}>
														<FaUserPen className='inline mr-2 ml-1' />
														Sign Up
													</div>
												</NavLink>
											</SheetContent>
										</Sheet>
									</>
								)
							) : (
								<div className=''>
									<Skeleton className='w-[30px] h-[30px] rounded-full bg-color08' />
								</div>
							)}
						</div>
					</NavigationMenu>
				</div>
			</div>
			<div className='w-full flex'>
				{showSearchInput && (
					<form
						onSubmit={handleSubmitSearch}
						className='flex w-full'
					>
						<Input
							type='text'
							placeholder='Type a series, movie, or artist'
							name='searchTerm'
							className={`${styleInput} flex md:hidden ml-4 mb-1`}
						></Input>
						<Button
							type='submit'
							className={`${styleButton} ml-2 mr-4`}
						>
							Search
						</Button>
					</form>
				)}
			</div>
		</>
	);
};

export default Navbar;
