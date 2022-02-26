import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { useState } from 'react'

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btndisabled, setBtndisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleChangeText = (e) => {
    if (text === '') {
      setBtndisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length < 9) {
      setBtndisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setBtndisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text, // shorthand when key and value are same
        rating,
      }

      handleAdd(newFeedback)

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleChangeText}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btndisabled}>
            Send
          </Button>
        </div>
      </form>
      {message && <div className='message'>{message}</div>}
    </Card>
  )
}

export default FeedbackForm
