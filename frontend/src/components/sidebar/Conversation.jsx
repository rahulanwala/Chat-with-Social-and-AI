import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const GEMINI_BOT_ID = "684d5abbb778607a3db28bbf" // used gemini_bot_id

const Conversation = ({ conversation, lastInd, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id) || conversation._id === GEMINI_BOT_ID; // used gemini_bot_id

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
        ${isSelected ? 'bg-sky-500' : ''}`} onClick={() => setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className='w-12 rounded-full'>
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            <span className='text-xl'>
              {conversation._id === GEMINI_BOT_ID
                ? '🤖' // used gemini_bot_id
                : emoji}
            </span>
          </div>
        </div>
      </div>

      {!lastInd && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation

// *** Initial Code ***

// import React from 'react'

// const Conversation = () => {
//   return (
//     <>
//       <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
//         <div className='avatar online'>
//           <div className='w-12 rounded-full'>
//             <img src="https://avatar.iran.liara.run/public/" alt="user avatar" />
//           </div>
//         </div>

//         <div className='flex flex-col flex-1'>
//           <div className='flex gap-3 justify-between'>
//             <p className='font-bold text-gray-200'>Rahul Anwala</p>
//             <span className='text-xl'>🙂</span>
//           </div>
//         </div>
//       </div>

//       <div className='divider my-0 py-0 h-1'></div>
//     </>
//   )
// }

// export default Conversation
