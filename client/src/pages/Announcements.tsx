import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hydrateAnnouncements } from '../features/secondarySlice'
import AnnouncementsHistory from '../components/announcements/AnnouncementsHistory'
import MinifiedAnnouncements from '../components/announcements/MinifiedAnnouncements'

export default function Announcements() {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(hydrateAnnouncements())
  },[])

  
  return (
    <div className='announcements_grid'>
      <h1>
        Announcement
      </h1>
      <MinifiedAnnouncements />
      <AnnouncementsHistory />
      <div className="announcement_ads"></div>
    </div>
  )
}

