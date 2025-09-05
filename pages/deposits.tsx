import DepositRequestsTable from '@/components/DepositRequestsTable';
import ManualCreditForm from '@/components/ManualCreditForm';
import styles from '@/styles/AdminDashboard.module.css';

export default function DepositsPage() {
  return (
    <div>
      <h1>Deposit Management</h1>
      <p style={{ color: '#a0a0a0', marginTop: '-5px' }}>
        Approve pending deposit requests from users or manually credit an account directly.
      </p>

      <div className={styles.container}>
        <div className={styles.mainPanel}>
          <DepositRequestsTable />
        </div>
        <div className={styles.sidePanel}>
          <ManualCreditForm />
        </div>
      </div>
    </div>
  );
}