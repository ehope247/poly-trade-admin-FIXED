import ChatInterface from '@/components/ChatInterface';
import styles from '@/styles/AdminDashboard.module.css';

const ChatPage = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Live Chat</h1>
          <p>Communicate directly with your users in real-time.</p>
        </div>
      </div>
      <ChatInterface />
    </div>
  );
};

export default ChatPage;