import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import getRandomEmoji from '../../utils/emojis';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  // console.log("Conversations: ", conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
       
      {conversations.map((conversation,idx) => (
        <Conversation 
        key={conversation._id} 
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastInd={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations

// *** Initial Code ***

// import React from 'react'
// import Conversation from './Conversation'
// import useGetConversations from '../../hooks/useGetConversations';

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>
//     </div>
//   )
// }

// export default Conversations
 