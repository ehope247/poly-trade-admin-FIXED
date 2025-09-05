import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseBrowserClient';
import styles from './ChatInterface.module.css';

interface User {
  user_id: string;
  profiles: { email: string; username: string; };
}
interface Message {
  id: number;
  created_at: string;
  content: string;
  sent_by_admin: boolean;
}

const ChatInterface = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchChatUsers = async () => {
    const response = await fetch('/api/getChatUsers');
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users);
    }
  };

  const fetchMessages = async (userId: string) => {
    setLoadingMessages(true);
    const response = await fetch(`/api/getMessages?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      setMessages(data || []);
    }
    setLoadingMessages(false);
  };

  useEffect(() => {
    fetchChatUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.user_id);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;
    const channel = supabase
      .channel(`messages_for_${selectedUser.user_id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `user_id=eq.${selectedUser.user_id}` }, 
        () => {
          fetchMessages(selectedUser.user_id);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const optimisticMessage = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      content: newMessage,
      sent_by_admin: true,
    };

    setMessages(currentMessages => [...currentMessages, optimisticMessage]);
    setNewMessage('');

    await fetch('/api/sendMessage', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ userId: selectedUser.user_id, content: newMessage }), 
    });
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    await fetch('/api/deleteMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messageId }), });
  };

  return (
    <div className={styles.chatLayout}>
      <aside className={styles.userList}>
        <div className={styles.listHeader}>Conversations</div>
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.user_id} className={`${styles.userItem} ${selectedUser?.user_id === user.user_id ? styles.selected : ''}`} onClick={() => setSelectedUser(user)}>
              <span>{user.profiles.username || 'Unknown'}</span>
              <small>{user.profiles.email || 'N/A'}</small>
            </div>
          ))
        ) : <div className={styles.noUsers}>No active conversations.</div> }
      </aside>
      <main className={styles.chatWindow}>
        {selectedUser ? (
          <>
            <div className={styles.chatHeader}>Chat with {selectedUser.profiles.username}</div>
            <div className={styles.messageArea}>
              {loadingMessages ? <p>Loading messages...</p> : (
                messages.map(msg => (
                  <div key={msg.id} className={`${styles.message} ${msg.sent_by_admin ? styles.adminMessage : styles.userMessage}`}>
                    <p>{msg.content}</p>
                    <button onClick={() => handleDeleteMessage(msg.id)} className={styles.deleteButton}>×</button>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className={styles.inputArea}>
              {/* --- THIS IS THE FIX --- */}
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your reply..." />
              <button type="submit">Send</button>
            </form>
          </>
        ) : <div className={styles.placeholder}>Select a conversation to start chatting.</div> }
      </main>
    </div>
  );
};
export default ChatInterface;