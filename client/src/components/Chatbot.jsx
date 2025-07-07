import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { baseUrl } from '../utilities/baseUrl';
import { useSelector } from 'react-redux';
import { Avatar, Input, Button, Spin, Tooltip, message, Divider, Typography } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, DeleteOutlined, HistoryOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown'

const { Text, Title } = Typography;

function Chatbot() {
  const { user } = useSelector(state => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Fetch user conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const userId = user?.data?._id || user?._id;
        
        if (!userId) {
          message.error('User data not available');
          setLoading(false);
          return;
        }
        
        const res = await axios.post(
          `${baseUrl}/chatbot/conversations`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (res.data && res.data.success) {
          setConversations(res.data.data);
          
          // If there are conversations, select the most recent one
          if (res.data.data.length > 0) {
            const mostRecent = res.data.data.sort((a, b) => 
              new Date(b.updatedAt) - new Date(a.updatedAt)
            )[0];
            
            setCurrentConversation(mostRecent._id);
            fetchMessages(mostRecent._id);
          } else {
            // Create a new conversation if none exists
            createNewConversation();
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
        message.error('Failed to load chat history');
        // Create a new conversation if fetching fails
        createNewConversation();
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      const userId = user?.data?._id || user?._id;
      
      if (!userId) {
        message.error('User data not available');
        setLoading(false);
        return;
      }
      
      const res = await axios.post(
        `${baseUrl}/chatbot/messages/${conversationId}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data && res.data.success) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      message.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
    try {
      setLoading(true);
      const userId = user?.data?._id || user?._id;
      
      if (!userId) {
        message.error('User data not available');
        setLoading(false);
        return;
      }
      
      const res = await axios.post(
        `${baseUrl}/chatbot/conversations/create`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data && res.data.success) {
        const newConversation = res.data.data;
        setConversations([newConversation, ...conversations]);
        setCurrentConversation(newConversation._id);
        setMessages([]);
        
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: "Hello! I'm MediBot, your healthcare assistant. How can I help you today?",
          createdAt: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      message.error('Failed to start a new conversation');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation) return;
    
    const userMessage = {
      role: 'user',
      content: input,
      createdAt: new Date().toISOString()
    };
    
    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setLoading(true);
    
    try {
      const userId = user?.data?._id || user?._id;
      
      if (!userId) {
        message.error('User data not available');
        setLoading(false);
        return;
      }
      
      const res = await axios.post(
        `${baseUrl}/chatbot/messages`,
        {
          userId,
          conversationId: currentConversation,
          content: input
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data && res.data.success) {
        // Add bot response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: res.data.data.content,
          createdAt: res.data.data.createdAt
        }]);
        
        // Update conversations list to reflect the latest message
        updateConversationsList();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      message.error('Failed to send message');
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        createdAt: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
      // Focus input after sending
      chatInputRef.current?.focus();
    }
  };

  const updateConversationsList = async () => {
    try {
      const userId = user?.data?._id || user?._id;
      
      if (!userId) {
        return;
      }
      
      const res = await axios.post(
        `${baseUrl}/chatbot/conversations`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data && res.data.success) {
        setConversations(res.data.data);
      }
    } catch (error) {
      console.error('Error updating conversations list:', error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      const userId = user?.data?._id || user?._id;
      
      if (!userId) {
        message.error('User data not available');
        return;
      }
      
      await axios.post(
        `${baseUrl}/chatbot/conversations/delete/${conversationId}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update UI
      setConversations(prev => prev.filter(conv => conv._id !== conversationId));
      
      // If the deleted conversation is the current one, create a new one
      if (currentConversation === conversationId) {
        createNewConversation();
      }
      
      message.success('Conversation deleted');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      message.error('Failed to delete conversation');
    }
  };

  const selectConversation = (conversationId) => {
    setCurrentConversation(conversationId);
    fetchMessages(conversationId);
    setHistoryOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreviewText = (conversation) => {
    const content = conversation.lastMessage?.content || 'New conversation';
    return content.length > 30 ? `${content.substring(0, 30)}...` : content;
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={3} className="mb-0 text-gray-800">MediBot Assistant</Title>
            <Text className="text-gray-500">Your personal healthcare companion</Text>
          </div>
          <div className="flex gap-3">
            <Tooltip title="Chat History">
              <Button
                type="primary"
                shape="circle"
                icon={<HistoryOutlined />}
                onClick={() => setHistoryOpen(!historyOpen)}
                className="bg-blue-500"
              />
            </Tooltip>
            <Tooltip title="New Conversation">
              <Button
                type="primary"
                onClick={createNewConversation}
                className="bg-green-500"
              >
                New Chat
              </Button>
            </Tooltip>
          </div>
        </div>
        
        <div className="flex flex-grow">
          {/* Chat History Sidebar */}
          {historyOpen && (
            <div className="w-1/4 mr-4 bg-white rounded-lg shadow-md overflow-y-auto border border-gray-200">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <Text strong>Chat History</Text>
                <Button 
                  type="text" 
                  icon={<CloseCircleOutlined />} 
                  onClick={() => setHistoryOpen(false)}
                  size="small"
                />
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No previous conversations
                  </div>
                ) : (
                  conversations.map(conversation => (
                    <div 
                      key={conversation._id}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center ${currentConversation === conversation._id ? 'bg-blue-50' : ''}`}
                      onClick={() => selectConversation(conversation._id)}
                    >
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate">
                          {formatDate(conversation.updatedAt)}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {getPreviewText(conversation)}
                        </div>
                      </div>
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conversation._id);
                          }}
                        />
                      </Tooltip>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* Chat Area */}
          <div className={`flex-grow bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col ${historyOpen ? 'w-3/4' : 'w-full'}`}>
            {/* Messages Container */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <RobotOutlined style={{ fontSize: '48px', color: '#2563EB' }} />
                  <Title level={4} className="mt-4 mb-2">Welcome to MediBot!</Title>
                  <Text className="text-gray-500 max-w-md">
                    I'm your personal healthcare assistant. Ask me any medical questions, schedule help, or general healthcare information.
                  </Text>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                      <Avatar
                        icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                        className={msg.role === 'user' ? 'bg-blue-500 ml-2' : 'bg-green-500 mr-2'}
                      />
                      <div 
                        className={`py-2 px-4 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-blue-500 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                        <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                          {formatDate(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex items-center mb-4">
                  <Avatar icon={<RobotOutlined />} className="bg-green-500 mr-2" />
                  <div className="py-2 px-4 bg-white text-gray-800 rounded-lg rounded-tl-none border border-gray-200">
                    <Spin size="small" /> <span className="ml-2 text-sm">MediBot is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex">
                <Input
                  ref={chatInputRef}
                  placeholder="Ask MediBot anything about healthcare..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPressEnter={sendMessage}
                  disabled={loading || !currentConversation}
                  className="flex-grow rounded-r-none"
                  autoFocus
                />
                <Button 
                  type="primary" 
                  icon={<SendOutlined />}
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || !currentConversation}
                  className="rounded-l-none bg-blue-500"
                >
                  Send
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                MediBot provides general information and should not replace professional medical advice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chatbot; 