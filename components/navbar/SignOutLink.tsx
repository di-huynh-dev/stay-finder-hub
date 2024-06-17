'use client'
import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { useToast } from '../ui/use-toast'

function SignOutLink() {
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: 'Signed out',
      description: 'You have been signed out of your account.',
    })
  }

  return (
    <SignOutButton redirectUrl="/">
      <button onClick={handleLogout} className="w-full text-left">
        Logout
      </button>
    </SignOutButton>
  )
}

export default SignOutLink
