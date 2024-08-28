import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeTheme } from './themeSlice';

import ThemeExample from '../../components/ThemeExample';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { styleH1, styleBoxBorder } from '../../constants/styles';

const Theme = () => {
	const theme = useAppSelector((state) => state.theme.value);
	const dispatch = useAppDispatch();
	return (
		<>
			<div className='flex-row w-full h-full p-3'>
				<div className='mb-2'>
					<h1 className={`${styleH1}`}>Theme Selector</h1>
					<p className='text-sm'>Choose Stream Note App appearance</p>
					<div className={`rounded bg-textColor/30 h-[2px] mt-1 mb-5`}></div>
				</div>
				<div className=''>
					<RadioGroup
						defaultValue={theme}
						className='lg:flex place-content-evenly'
					>
						<div className={`${styleBoxBorder} p-1 flex-row`}>
							<div className=''>
								<ThemeExample themeName='gruvbox' />
							</div>
							<div className='flex mt-2'>
								<RadioGroupItem
									value='gruvbox'
									id='gruvbox'
									onClick={() => dispatch(changeTheme('gruvbox'))}
									className='mr-1'
								/>
								<Label htmlFor='gruvbox'>GruvBox</Label>
							</div>
						</div>
						<div className={`${styleBoxBorder} p-1`}>
							<div className=''>
								<ThemeExample themeName='gruvboxDark' />
							</div>
							<div className='flex mt-2'>
								<RadioGroupItem
									value='gruvboxDark'
									id='gruvboxDark'
									onClick={() => dispatch(changeTheme('gruvboxDark'))}
									className='mr-1'
								/>
								<Label htmlFor='gruvboxDark'>GruvBox Dark</Label>
							</div>
						</div>
						<div className={`${styleBoxBorder} p-1`}>
							<div className=''>
								<ThemeExample themeName='rosePineMoon' />
							</div>
							<div className="flex mt-2">
							<RadioGroupItem
								value='rosePineMoon'
								id='rosePineMoon'
								onClick={() => dispatch(changeTheme('rosePineMoon'))}
								className='mr-1'
							/>
							<Label htmlFor='rosePineMoon'>RosePineMoon</Label>
							</div>
						</div>
					</RadioGroup>
				</div>
			</div>
		</>
	);
};

export default Theme;
