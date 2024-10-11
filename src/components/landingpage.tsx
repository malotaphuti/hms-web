'use client';


// import Header from './header';
// import Loginlogic from './loginlogic';
import Headerlinks from './headerlinks';

import React from 'react'

export default function landingpage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/*Header Section*/}
      {/* <Header /> */}
  
      {/*Hero Section*/}
      <section className='flex-1 bg-blue-50 flex items-center justify-center'>
        <div className="text-center px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to HMS</h1>
          <p className="text-xl text-gray-700 mb-8">Your gateway to quality education</p>
  
  
          {/* Add HeaderLinks here */}
          <div className="mt-6">
            <Headerlinks />
          </div>
  
          {/* Optional "Get Started" button */}
          <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600">
            Get Started
          </button>
        </div>
      </section>
  
      {/* Footer Section (optional) */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>© 2024 HMS. All rights reserved.</p>
      </footer>
    </div>
  );
  
}

// const landingpage = () => {
// };

// export default landingpage
