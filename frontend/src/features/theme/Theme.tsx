import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { gruvbox, gruvboxDark, rosePineMoon } from './themeSlice';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Theme = () => {
	const theme = useAppSelector((state) => state.theme.value);
	const dispatch = useAppDispatch();
	return (
		<>
			<div className=''>Theme selector: {theme}</div>
			<div className=''>
				<RadioGroup>
					<div className=''>
						<RadioGroupItem
							value='gruvbox'
							id='gruvbox'
							onClick={() => dispatch(gruvbox())}
							/>
						<Label htmlFor='gruvbox'>GruvBox</Label>
					</div>
					<div className=''>
						<RadioGroupItem
							value='gruvboxDark'
							id='gruvboxDark'
							onClick={() => dispatch(gruvboxDark())}
							/>
						<Label htmlFor='gruvboxDark'>GruvBox Dark</Label>
					</div>
					<div className=''>
						<RadioGroupItem
							value='rosePineMoon'
							id='rosePineMoon'
							onClick={() => dispatch(rosePineMoon())}
						/>
						<Label htmlFor='rosePineMoon'>RosePineMoon</Label>
					</div>
				</RadioGroup>
			</div>
		</>
	);
};

export default Theme;
