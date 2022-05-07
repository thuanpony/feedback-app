import React from 'react'
import Card from './shared/Card'
import {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from './context/FeedbackContext'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState()
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)
    useEffect(() => {
        if (feedbackEdit.edit===true) {
            setDisabledBtn(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])
    
    
    const handleText = (e) => {
        setText(e.target.value)
        let textP = e.target.value
        if (textP==='') {
            setDisabledBtn(true)
            setMessage('')
        } else if (textP!=='' && textP.trim().length<=10) {
            setMessage('You must write at least 10 characters.')
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false)
            setMessage('')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length>10) {
            const newFeedback = {
                text,
                rating
            }
            if (feedbackEdit.edit===true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {      
                addFeedback(newFeedback)
            }   
            setText('')
        }
    }
    

  return (
    <Card>
        <form onSubmit={handleSubmit}>  
            <h2>How would you rate your service with us</h2>
            <RatingSelect select={(rating) => {setRating(rating)}}/>
            <div className="input-group">
                <input
                    onChange={handleText}
                    type = 'text'   
                    placeholder='Write your review'
                    value={text}
                />
                <Button type='submit' isDisabled={disabledBtn}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

FeedbackForm.propTypes = {
    text: PropTypes.string.isRequired
}

export default FeedbackForm