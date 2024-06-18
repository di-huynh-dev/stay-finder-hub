import React from 'react'
import { LuUser2 } from 'react-icons/lu'
import { fetchProfileImage } from '@/utils/actions'
import Image from 'next/image'

async function UserIcon() {
  const profileImage = await fetchProfileImage()
  if (profileImage) {
    return <img src={profileImage} className="h-6 w-6 object-cover rounded-full" alt="profile image" />
  }
  return <LuUser2 className="h-6 w-6 bg-primary rounded-full text-white" />
}

export default UserIcon
