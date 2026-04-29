import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { personas, suggestionChips } from './prompts';
import { sendMessageToGemini } from './gemini';
import './index.css';

// Helper to parse think blocks
const formatMessageWithThink = (text) => {
  const parts = text.split(/(<think>[\s\S]*?<\/think>)/g);
  return parts.map((part, index) => {
    if (part.startsWith('<think>') && part.endsWith('</think>')) {
      // Return null to completely hide the reasoning block from the UI
      return null;
    }
    // Convert newlines to br
    return (
      <span key={index}>
        {part.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  });
};

function App() {
  const [activePersona, setActivePersona] = useState(personas.anshuman.id);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const chatAreaRef = useRef(null);
  const inputRef = useRef(null);

  const persona = personas[activePersona];
  const suggestions = suggestionChips[activePersona];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSwitchPersona = (id) => {
    if (id === activePersona) return;
    setActivePersona(id);
    setMessages([]);
    setError(null);
    setInput('');
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: text.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(newMessages, persona.systemPrompt);
      setMessages([...newMessages, { role: 'model', text: response }]);
    } catch (err) {
      setError(err.message || 'An error occurred while calling the API.');
    } finally {
      setIsLoading(false);
      // Focus input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <div className="chat-wrapper">
        {/* Header */}
        <div className="header">
          <h1>Scaler Mentorship Chat</h1>
          <div className="persona-switcher">
            {Object.values(personas).map((p) => (
              <button
                key={p.id}
                className={`persona-btn ${activePersona === p.id ? 'active' : ''}`}
                data-theme={p.theme}
                onClick={() => handleSwitchPersona(p.id)}
              >
                <div className={`avatar-circle theme-${p.theme}`}>{p.avatar}</div>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area" ref={chatAreaRef}>
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className={`welcome-avatar theme-${persona.theme}`}>
                {persona.avatar}
              </div>
              <h2 className="welcome-title">Chat with {persona.name}</h2>
              <p className="welcome-subtitle">{persona.role}</p>
              
              <div className="suggestion-chips">
                {suggestions.map((suggestion, idx) => (
                  <button 
                    key={idx} 
                    className="chip"
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className="message-bubble">
                  {msg.role === 'model' ? formatMessageWithThink(msg.text) : msg.text}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <textarea
              ref={inputRef}
              className="input-field"
              placeholder={`Ask ${persona.name} a question...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            />
            <button 
              className="send-btn" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
