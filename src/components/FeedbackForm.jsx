import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { useState } from 'react'

function FeedbackForm() {
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

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
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
