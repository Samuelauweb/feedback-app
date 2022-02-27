import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item 2 is from context',
      rating: 9,
    },
    {
      id: 3,
      text: 'This item 3 is from context',
      rating: 7,
    },
  ])

  const deleteFeedback = (id) => {
    if (window.confirm(`Are you sure you want to delete id?`)) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

    const addFeedback = (newFeedback) => {
      newFeedback.id = uuidv4()
      console.log(typeof newFeedback.id)
      setFeedback([newFeedback, ...feedback]) // Because state is immutable, so use spread operator
    }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
