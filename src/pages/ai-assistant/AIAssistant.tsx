import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { 
  PaperPlaneIcon,
  CopyIcon,
  SearchIcon,
  HorizontaLDots
} from "../../icons";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isToday: boolean;
}

const AIAssistant: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "I'm looking for a block of random, imaginative text—something quirky or unexpected to use as placeholder content",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat. Integer accumsan tellus vel tincidunt. Sed sed dictum orci, in pretium erat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut varius tortor.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const [currentInput, setCurrentInput] = useState("");
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Write a follow-up email to...",
      lastMessage: "I'm looking for a block of random...",
      timestamp: new Date(),
      isToday: true,
    },
    {
      id: "2", 
      title: "Generate responsive login...",
      lastMessage: "Create a modern login page...",
      timestamp: new Date(),
      isToday: true,
    },
    {
      id: "3",
      title: "Create a warning style m...",
      lastMessage: "I need a warning component...",
      timestamp: new Date(),
      isToday: true,
    },
    {
      id: "4",
      title: "Suggest color palette for...",
      lastMessage: "What colors work well...",
      timestamp: new Date(),
      isToday: true,
    },
    {
      id: "5",
      title: "Improve login page acces...",
      lastMessage: "How can I make my login...",
      timestamp: new Date(Date.now() - 86400000),
      isToday: false,
    },
    {
      id: "6",
      title: "Create a warning style m...",
      lastMessage: "Design a warning modal...",
      timestamp: new Date(Date.now() - 86400000),
      isToday: false,
    },
    {
      id: "7",
      title: "Add password visibility to...",
      lastMessage: "I want to add a toggle...",
      timestamp: new Date(Date.now() - 86400000),
      isToday: false,
    },
    {
      id: "8",
      title: "Write validation logic for f...",
      lastMessage: "Create form validation...",
      timestamp: new Date(Date.now() - 86400000),
      isToday: false,
    },
    {
      id: "9",
      title: "Fix mobile responsiveness...",
      lastMessage: "My layout breaks on mobile...",
      timestamp: new Date(Date.now() - 86400000),
      isToday: false,
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentInput,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentInput("");
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '100px';
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. Let me help you with that. Here's a comprehensive response to address your needs...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const filteredSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todaySessions = filteredSessions.filter(session => session.isToday);
  const yesterdaySessions = filteredSessions.filter(session => !session.isToday);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col order-2 lg:order-1">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <PageBreadcrumb 
            pageTitle={t('aiAssistant.title')}
            pageLink="/"
            pageLinkText={t('sidebar.home')}
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {t('aiAssistant.title')}
          </h1>
        </div>

        {/* Mobile Chat History Toggle */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {t('aiAssistant.chatsHistory')}
            </span>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${isMobileSidebarOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Mobile Chat History Dropdown */}
          {isMobileSidebarOpen && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {todaySessions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    {t('aiAssistant.today')}
                  </h3>
                  {todaySessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.lastMessage}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {yesterdaySessions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 mt-4">
                    {t('aiAssistant.yesterday')}
                  </h3>
                  {yesterdaySessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.lastMessage}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg px-4 py-3 ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {!message.isUser && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(message.content)}
                      startIcon={<CopyIcon className="w-4 h-4" />}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {t('aiAssistant.copy')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 lg:py-6">
          <div className="space-y-4">
            {/* Main Input Field */}
            <div className="relative">
              <textarea
                ref={inputRef}
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value);
                  // Auto-resize textarea
                  const textarea = e.target;
                  textarea.style.height = 'auto';
                  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
                }}
                onKeyPress={handleKeyPress}
                placeholder={t('aiAssistant.inputPlaceholder')}
                className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base leading-relaxed overflow-hidden"
                rows={3}
                style={{ minHeight: '100px', maxHeight: '200px' }}
              />
            </div>
            
            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm font-medium">{t('aiAssistant.attach')}</span>
              </button>
              
              <Button
                variant="primary"
                size="md"
                onClick={handleSendMessage}
                disabled={!currentInput.trim()}
                className="px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <PaperPlaneIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-col order-1 lg:order-2">
        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            startIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            {t('aiAssistant.newChat')}
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('aiAssistant.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {/* Today */}
          {todaySessions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {t('aiAssistant.today')}
              </h3>
              <div className="space-y-2">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {session.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {session.lastMessage}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <HorizontaLDots className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {yesterdaySessions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {t('aiAssistant.yesterday')}
              </h3>
              <div className="space-y-2">
                {yesterdaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {session.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {session.lastMessage}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <HorizontaLDots className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show more */}
          <div className="p-4">
            <button className="w-full text-left text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
              {t('aiAssistant.showMore')}
              <HorizontaLDots className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
