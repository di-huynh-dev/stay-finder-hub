'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import Title from './Title'

function Description({ description }: { description: string }) {
  const [isFullDescriptionShow, setIsFullDescriptionShow] = useState(false)

  const words = description.split(' ')
  const isLong = words.length > 100

  const toggleDescription = () => {
    setIsFullDescriptionShow(!isFullDescriptionShow)
  }

  const displayedDescription = isLong && !isFullDescriptionShow ? words.slice(0, 100).join(' ') + '...' : description
  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">{displayedDescription}</p>
      {isLong && (
        <Button variant="link" className="pl-0" onClick={toggleDescription}>
          {isFullDescriptionShow ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  )
}

export default Description
