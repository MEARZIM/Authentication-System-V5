import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import React from 'react'

const UserPage = async () => {
  const session = await auth();

  return (
    <div>
      Users Page
      {JSON.stringify(session)}
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <Button variant="outline" size="lg">
          SignOut
        </Button>
      </form>
    </div>
  )
}

export default UserPage
