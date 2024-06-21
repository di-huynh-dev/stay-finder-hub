import Image from 'next/image'
import React from 'react'

function ImageContainer({ mainImage, name }: { mainImage: string; name: string }) {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-8">
      <Image src={mainImage} alt={name} fill className="object-cover rounded" sizes="100vw" priority />
    </section>
  )
}

export default ImageContainer
