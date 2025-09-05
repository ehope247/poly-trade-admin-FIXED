import { useState } from 'react';
import styles from '@/styles/AdminForms.module.css';

const ManualCreditForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    const response = await fetch('/api/manualCredit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount: parseFloat(amount) }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`Success! User credited.`);
      setEmail('');
      setAmount('');
    } else {
      setMessage(`Error: User not found.`);
    }
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Manual Account Credit</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">User Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">Amount to Credit (USD)</label>
          <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500.00" required step="0.01" />
        </div>
        <button type="submit" className={styles.submitButton}>Credit User Account</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
export default ManualCreditForm;