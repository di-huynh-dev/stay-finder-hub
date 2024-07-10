'use client'

import { SignInButton, useAuth } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import FormContainer from '../form/FormContainer'
import { SubmitButton } from '../form/SubmitButton'
import { createBookingAction } from '@/utils/actions'
import { useProperty } from '@/utils/store'

function ConfirmBooking() {
  const { userId } = useAuth()
  const { propertyId, range } = useProperty((state) => state)
  const checkIn = range?.from as Date
  const checkOut = range?.to as Date
  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign in to complete booking
        </Button>
      </SignInButton>
    )
  }
  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  })
  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton size="lg" text="Reverse" className="w-full" />
      </FormContainer>
    </section>
  )
}

export default ConfirmBooking
