import React from 'react'
import { message } from '../../vite-env'
import ServerImage from '../ServerImage'

export default function ImgMessageContainer({ message, mode }: { message: message, mode: 'inline' | 'full' }) {
  return (
    <div>
        <ServerImage path={message.Content} />
    </div>
  )
}
