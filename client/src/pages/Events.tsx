import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hydrateEvents } from '../features/secondarySlice'
import Calendar from '../components/events/Calendar'
import EventsHistory from '../components/events/EventsHistory'
import '../styles/events.scss'

export default function Events() {
  const dispatch = useDispatch()

  const upThreshold = new Date()
  upThreshold.setDate(upThreshold.getDate() + 34)
  const bottomThreshold = new Date()
  bottomThreshold.setDate(bottomThreshold.getDate() - 34)

  useEffect(() => {
    // @ts-ignore
    dispatch(hydrateEvents({upThreshold: upThreshold.getTime(),bottomThreshold: bottomThreshold.getTime()}))
  },[])

  return (
    <div className='events_grid'>
      <h1>Events</h1>
      <EventsHistory />
      <Calendar />
      <div className="ad_question"></div>
    </div>
  )
}
