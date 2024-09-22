'use client';

import React from 'react';

import UpdateNumberLogic from '@/components/updatenumberlogic';

// components
import Header from '@/components/header';

function UpdateStudentNumber() {
    return (
        <div className="container mx-auto">
            <Header />
            <h1>please update student number below</h1>

            <div className="flex flex-col justify-center mt-10">
                <UpdateNumberLogic />
            </div>
        </div>
    );
}

export default UpdateStudentNumber;
