import React from 'react'
import toDate from '../../utils/toDate'
import { event } from '../../vite-env'

export default function EventBlock({event}: {event: event}) {
    const {day,hour,minutes,month} = toDate(event.CompletionDate)
    // const {} = toDate(event.DatePosted)
  return (
    <div className='event_block'>
        <div className="primary">
        <h3>
            {
                event.Title
            }
        </h3>
            <span>
                {hour}:{minutes} {day}/{month}
            </span>
        </div>
        <p>
            {
                event.Description
            }
        </p>
    </div>
  )
}
