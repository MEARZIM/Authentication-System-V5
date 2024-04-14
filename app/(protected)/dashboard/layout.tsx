import React from 'react'
import { auth } from '@/auth'


const DashboardLayout = async ({
  children
}: { children: React.ReactNode }) => {

  const session = await auth();

  return (
  
      <div className='flex flex-col gap-y-4'>
        {children}
      </div>
   
  )
}

export default DashboardLayout
