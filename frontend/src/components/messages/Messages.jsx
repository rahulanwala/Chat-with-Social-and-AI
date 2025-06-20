import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  // console.log(messages)

  useListenMessages();

  const lastMessageRef = useRef();

  // To scroll to the last message when new messages are added
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 &&
        <p className='text-center'>Send a message to start the conversation</p>}

    </div>
  )
}

export default Messages

// *** Initial Code ***

// import React from 'react'
// import Message from './Message'

// const messages = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//     </div>
//   )
// }

// export default messages
