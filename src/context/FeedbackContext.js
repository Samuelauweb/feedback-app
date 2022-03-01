import { createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, // when the icon is clicked, the content about that item will be put in here
    edit: false, // when the icon is clicked, it will change to 'true', which means we are in edit mode
  })

  useEffect(() => {
    fetchFeedback()
  }, []) // when the page is loaded, it will run

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm(`Are you sure you want to delete id?`)) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    // newFeedback.id = uuidv4() // it can be removed because database will generate id automatically
    console.log(typeof newFeedback.id)
    setFeedback([data, ...feedback]) // Because state is immutable, so use spread operator
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json()
    // console.log(id, updItem)
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        fetchFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
