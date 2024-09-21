import React from 'react'

import UpdateNumberLogic from '@/components/updatenumberlogic'

function UpdateStudentNumber() {
  return (
    <div>
        <h1>please update student number below</h1>
        
        <div className='flex flex-col justify-center mt-10'>
            <UpdateNumberLogic/>
        </div>
    </div>
  )
}

export default UpdateStudentNumber