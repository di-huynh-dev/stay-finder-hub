import React from 'react'
import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa'

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating)
  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, index) => {
        const className = `w-3 h-3 ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`
        return isFilled ? <FaStar className={className} key={index} /> : <FaRegStar className={className} key={index} />
      })}
    </div>
  )
}

export default Rating
