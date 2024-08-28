import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeTheme } from './themeSlice';

import ThemeExample from '../../components/ThemeExample';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Theme = () => {
	const theme = useAppSelector((state) => state.theme.value);
	const dispatch = useAppDispatch();
	return (
		<>
			<div className=''>Theme selector: {theme}</div>
			<div className=''>
				<RadioGroup defaultValue={theme}>
					<div className=''>
						<div className=''>
							<ThemeExample themeName='gruvbox' />
						</div>
						<RadioGroupItem
							value='gruvbox'
							id='gruvbox'
							onClick={() => dispatch(changeTheme('gruvbox'))}
						/>
						<Label htmlFor='gruvbox'>GruvBox</Label>
					</div>
					<div className=''>
					<div className=''>
							<ThemeExample themeName='gruvboxDark' />
						</div>
						<RadioGroupItem
							value='gruvboxDark'
							id='gruvboxDark'
							onClick={() => dispatch(changeTheme('gruvboxDark'))}
						/>
						<Label htmlFor='gruvboxDark'>GruvBox Dark</Label>
					</div>
					<div className=''>
					<div className=''>
							<ThemeExample themeName='rosePineMoon' />
						</div>
						<RadioGroupItem
							value='rosePineMoon'
							id='rosePineMoon'
							onClick={() => dispatch(changeTheme('rosePineMoon'))}
						/>
						<Label htmlFor='rosePineMoon'>RosePineMoon</Label>
					</div>
				</RadioGroup>
			</div>
		</>
	);
};

export default Theme;
