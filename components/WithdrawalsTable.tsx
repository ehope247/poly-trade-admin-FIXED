import { useState, useEffect } from 'react';
import styles from './UsersTable.module.css';

const WithdrawalsTable = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getWithdrawals');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRequests(data.withdrawals || []);
    } catch (error) {
      console.error("Component Error: Failed to fetch withdrawal requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (withdrawalId: number) => {
    setMessage('Processing...');
    const response = await fetch('/api/approveWithdrawal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ withdrawalId }),
    });

    if (response.ok) {
      setMessage('Withdrawal approved successfully!');
      fetchRequests(); // Refresh the list
    } else {
      setMessage('Error approving withdrawal.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pending Withdrawal Requests</h2>
        {message && <p className={styles.message} style={{ color: message.startsWith('Error') ? '#ff6b6b' : '#10b981' }}>{message}</p>}
      </div>
      {loading ? <p>Loading requests...</p> : requests.length === 0 ? <p>No pending requests.</p> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Amount (USD)</th>
              <th>Network</th>
              <th>Wallet Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.user_email}</td>
                <td>${req.amount.toLocaleString()}</td>
                <td>{req.network}</td>
                <td title={req.wallet_address}>{`${req.wallet_address.substring(0, 10)}...`}</td>
                <td>
                  <button onClick={() => handleApprove(req.id)} className={styles.approveButton}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WithdrawalsTable;