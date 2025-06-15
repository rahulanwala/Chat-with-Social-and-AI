import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetGeminiResponse = () => {
	const [loading_bot, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const getGeminiResponse = async (message,sentMessage) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/chatbot/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			// console.log("value:", sentMessage);
			if (sentMessage) {
				setMessages([...messages, sentMessage, data]);
			} else {
				setMessages([...messages, data]);
			}

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { getGeminiResponse, loading_bot };
};
export default useGetGeminiResponse;
