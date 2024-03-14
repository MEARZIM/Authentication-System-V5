import { UserButton } from '@/components/auth/user-button'
import React from 'react'
import "./nav.css"

export const NavBar = () => {
  return (
    <nav className='flex justify-between items-center p-4'>
        <div>
            Logo
        </div>
      <UserButton />
    </nav>
  )
}


