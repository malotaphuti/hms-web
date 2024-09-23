import React from 'react';
import { Button } from './ui/button';

const RedirectPopUp = () => {
    const handleOpenPopUp = () => {
        const url =
            'http://localhost:8000/accounts/google/login/?process=login'; // URL to redirect
        const width = 400;
        const height = 650;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(
            url,
            'popupWindow',
            `width=${width},height=${height},top=${top},left=${left}`,
        );
    };

    return (
        <div>
            <Button
                className="flex flex-row justify-center ml-4 mr-4 
                            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                onClick={handleOpenPopUp}
            >
                google auth
            </Button>
        </div>
    );
};

export default RedirectPopUp;
