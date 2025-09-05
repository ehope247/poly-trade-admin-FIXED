import { useState, useEffect } from 'react';
import styles from './UsersTable.module.css';

interface User { id: string; email: string; username: string; created_at: string; }

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getUsers').then(res => res.json()).then(data => {
      setUsers(data.users);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.tableContainer}>
      {loading ? <p>Loading users...</p> : (
        <table className={styles.table}>
          <thead>
            <tr><th>User ID</th><th>Email</th><th>Username</th><th>Date Registered</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.substring(0, 8)}...</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default UsersTable;