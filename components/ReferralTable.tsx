import { useState, useEffect } from 'react';
import styles from './UsersTable.module.css'; // We can reuse the same professional styles

interface Referral {
  id: string;
  email: string;
  username: string;
  referred_by: string;
}

const ReferralTable = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch('/api/getReferrals');
        const data = await response.json();
        if (response.ok) {
          setReferrals(data.referrals);
        }
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  return (
    <div className={styles.tableContainer}>
      {loading ? (
        <p>Loading referrals...</p>
      ) : referrals.length === 0 ? (
        <p>No referred users have signed up yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>New User Email</th>
              <th>New User Username</th>
              <th>Referred By (Username)</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id}>
                <td>{referral.email}</td>
                <td>{referral.username}</td>
                <td>{referral.referred_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReferralTable;