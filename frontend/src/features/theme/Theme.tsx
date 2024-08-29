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
	const themeList: string[] = ['gruvbox', 'gruvboxDark', 'rosePineMoon']
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
						className='grid md:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto'
					>
						{themeList.map((item, key) => (
							<div className={`${styleBoxBorder} w-fit mx-auto p-1 flex-row`} key={key}>
							<div className=''>
								<ThemeExample themeName={item} />
							</div>
							<div className='flex mt-2'>
								<RadioGroupItem
									value={item}
									id={item}
									onClick={() => dispatch(changeTheme(item))}
									className='mr-1'
								/>
								<Label htmlFor={item}>{item}</Label>
							</div>
						</div>
						))}
					</RadioGroup>
				</div>
			</div>
		</>
	);
};

export default Theme;
