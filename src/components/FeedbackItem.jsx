import React from 'react'
import { useState } from 'react'

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('This is an example of a feeback item')

  const handleClick = () => {
    setRating((prevValue) => {
      return prevValue + 1
    })
  }

  return (
    <div className='card'>
      <div className="num-display">{rating}</div>
      <div className="text-display">
        {text}
      </div>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default FeedbackItem