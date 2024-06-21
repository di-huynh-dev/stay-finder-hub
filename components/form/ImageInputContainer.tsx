'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import FormContainer from './FormContainer'
import ImageInput from './ImageInput'
import { type actionFunction } from '@/types/types'
import { LuUser2 } from 'react-icons/lu'
import { SubmitButton } from './SubmitButton'

type ImageInputContainerProps = {
  image: string
  name: string
  action: actionFunction
  text: string
  children?: React.ReactNode
}

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text, children } = props
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false)

  const userIcon = <LuUser2 className="h-24 w-24 bg-primary rounded-full text-white mb-4" />
  return (
    <div>
      {image ? (
        <Image src={image} alt={name} width={200} height={200} className="rounded object-cover mb-4 w-24 h-24" />
      ) : (
        userIcon
      )}
      <Button variant={'outline'} size="sm" onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}>
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-lg mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  )
}

export default ImageInputContainer
