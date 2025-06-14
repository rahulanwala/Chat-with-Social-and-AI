import ReactMarkdown from 'react-markdown'

import useConversation from '../../zustand/useConversation';
import {useAuthContext} from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : ''

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="chat-image" />
            </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}> <ReactMarkdown>{message.message}</ReactMarkdown></div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message

// *** Initial Code ***

// import React from 'react'

// const Message = () => {
//   return (
//     <div className='chat chat-end'>
//         <div className='chat-image avatar'>
//             <div className='w-10 rounded-full'>
//                 <img src="https://avatar.iran.liara.run/public/" alt="chat-image" />
//             </div>
//         </div>

//         <div className='chat-bubble text-white bg-blue-500'>Hi!, what is up</div>
//         <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
//     </div>
//   )
// }

// export default Message
