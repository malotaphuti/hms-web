'use client';

import React from 'react';
import Headerlinks from './headerlinks';
import Navbar from './navbar';

export default function Landingpage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/*Include navbar here*/}
            <Navbar />
            
            {/* Hero Section */}
            <section className="flex-1 bg-blue-50 flex items-center justify-center">
                <div className="text-center px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to HMS</h1>
                    <p className="text-xl text-gray-700 mb-8">Your gateway to quality education</p>

                    {/* Header Links Section */}
                    <div className="mt-6">
                        <Headerlinks />
                    </div>

                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white text-center py-4">
                <p>© 2024 HMS. All rights reserved.</p>
            </footer>
        </div>
    );
}



// const landingpage = () => {
// };

// export default landingpage
