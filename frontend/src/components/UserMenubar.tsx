import React from 'react';

import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router-dom';

import { styleBoxBorder } from '../constants/styles';

const UserMenubar = () => {
	return (
		<>
			<div className={`${styleBoxBorder} p-4`}>
				<NavigationMenu>
					<div className=''>
						<NavLink
							to='/profile'
							className={({ isActive }) => {
								return isActive ? 'text-color05 font-bold' : 'text-textColor';
							}}
						>
							Profile
						</NavLink>
					</div>
					<div className=''>
						<NavLink
							to='/appearance'
							className={({ isActive }) => {
								return isActive ? 'text-color05 font-bold' : 'text-textColor';
							}}
						>
							Appearance
						</NavLink>
					</div>
				</NavigationMenu>
			</div>
		</>
	);
};
export default UserMenubar;
