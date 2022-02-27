import React from 'react'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
// import PropTypes from 'prop-types'

function FeedbackList({ handleDelete }) {
  const { feedback, setFeedback } = useContext(FeedbackContext)

  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>
  }

  // With Framer-motion
  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
  // Without Framer-motion
  // return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => {
  //       return (
  //         <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //       )
  //     })}
  //   </div>
  // )
}

// Removed after implementing Context API
// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       // id: PropTypes.number.required,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   ),
// }

export default FeedbackList
