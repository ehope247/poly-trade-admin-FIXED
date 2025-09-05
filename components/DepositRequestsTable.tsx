import { useState, useEffect } from 'react';
import styles from './UsersTable.module.css';

const DepositRequestsTable = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getDeposits');
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      setRequests(data.deposits || []);
    } catch (error) {
      console.error("Component Error: Failed to fetch deposit requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (depositId: number) => {
    setMessage('Processing...');
    const response = await fetch('/api/approveDeposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ depositId }),
    });

    if (response.ok) {
      setMessage('Deposit approved successfully!');
      fetchRequests(); // Refresh the list
    } else {
      setMessage('Error approving deposit.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pending Deposit Requests</h2>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      {loading ? <p>Loading...</p> : requests.length === 0 ? <p>No pending requests.</p> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Amount (USD)</th>
              <th>Network</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                {/* This is the corrected way to access the email */}
                <td>{req.user_email}</td>
                <td>${req.amount.toLocaleString()}</td>
                <td>{req.network}</td>
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

export default DepositRequestsTable;