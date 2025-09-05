import UsersTable from '@/components/UsersTable';
import styles from '@/styles/AdminDashboard.module.css';

export default function UsersPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Users Management</h1>
          <p>A complete list of all users registered on the platform.</p>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}