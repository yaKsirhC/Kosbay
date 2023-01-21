import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import '../../styles/events.scss'
import EventBlock from './EventBlock'
import SuperEventForm from './SuperEventForm'
export default function EventsHistory() {
  const {events} = useSelector((state: RootState) => state.secondary)
  const {isSuper} = useSelector((state: RootState) => state.auth)

  return (
    <div className='events_history'>
      {
        isSuper && <SuperEventForm />
      }
      <div className="history">
        {
          events.map((event,i) => {
            return <EventBlock event={event} key={i} />
          })
        }
      </div>
    </div>
  )
}
