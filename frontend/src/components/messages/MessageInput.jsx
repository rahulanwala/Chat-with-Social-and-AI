import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';
import useConversation from '../../zustand/useConversation';

import useGetGeminiResponse from "../../hooks/useGetGeminiResponse";
import TypingIndicator from "./TypingIndicator";

const GEMINI_BOT_ID = "684d5abbb778607a3db28bbf" // used gemini_bot_id

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const { selectedConversation } = useConversation();
  const { loading_bot, getGeminiResponse } = useGetGeminiResponse();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const sentMessage = await sendMessage(message);
    setMessage("");

    if (selectedConversation?._id === GEMINI_BOT_ID) {
      await getGeminiResponse(message, sentMessage);
    }
  }

  return (
    <div>

      {/* Bot Thinking Indicator (as message) */}
      {selectedConversation?._id === GEMINI_BOT_ID && loading_bot && (
        <div className={`chat chat-start ml-4`}>
          <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS chat bubble component' src={selectedConversation?.profilePic} />
            </div>
          </div>
          <div className={`chat-bubble text-white pb-2`}>
            <TypingIndicator />
          </div>
        </div>
      )}

      <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input
            type='text'
            className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
            placeholder='Send a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || loading_bot}
          />
          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput

// *** Initial Code ***

// import React from 'react'
// import {BsSend} from 'react-icons/bs'

// const MessageInput = () => {
//   return (
//     <form className='px-4 my-3'>
//         <div className='w-full relative'>
//             <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700
//             border-gray-600 text-white' placeholder='Send a message' />

//             <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
//                 <BsSend/>
//             </button>
//         </div>
//     </form>
//   )
// }

// export default MessageInput
