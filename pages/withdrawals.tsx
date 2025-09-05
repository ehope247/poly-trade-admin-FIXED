import WithdrawalsTable from '@/components/WithdrawalsTable';
import styles from '@/styles/AdminDashboard.module.css'; // Reuse our standard page styles

const WithdrawalsPage = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Withdrawal Management</h1>
          <p>Review and approve pending withdrawal requests from users.</p>
        </div>
      </div>
      <WithdrawalsTable />
    </div>
  );
};

export default WithdrawalsPage;