import React from 'react';

import { styleMenuButton, styleBoxBorder, styleButton2 } from '../constants/styles';

interface themeName {
    theme: string
}

const ThemeExample = ({themeName}) => {
	return <>
    <div className={themeName}>
        <div className="relative w-[198px] h-[130px] rounded border-2 border-color09 bg-background">
            <div className={`${styleBoxBorder} absolute w-[170px] h-[15px] top-2 mx-3`}></div>
            <div className={`${styleBoxBorder} absolute top-7 mx-3 w-[170px] h-[90px]`}></div>
            <span className="absolute text-textColor top-9 left-5 text-xs">Lorem Ipsum</span>
            <div className={`${styleMenuButton} absolute border-1 top-24 right-4 bg-color05 w-[30px] h-[15px]`}></div>
            <div className={`${styleButton2} absolute border-1 top-24 right-16 bg-color05 w-[30px] h-[15px]`}></div>
        </div>
    </div>
    </>;
};

export default ThemeExample;
