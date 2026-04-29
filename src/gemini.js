import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not defined in the environment.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

export const sendMessageToGemini = async (messages, systemInstruction) => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }
  
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.7,
      }
    });

    const formattedMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // We only send previous history if there is any, but we must construct the history properly for the chat session
    const history = formattedMessages.slice(0, -1);
    const latestMessage = formattedMessages[formattedMessages.length - 1].parts[0].text;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to communicate with the AI. Please try again.");
  }
};
