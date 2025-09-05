import SettingsForm from '@/components/SettingsForm';
import styles from '@/styles/AdminDashboard.module.css'; // Reuse our standard page styles

const SettingsPage = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Settings</h1>
          <p>Manage the global content and settings for your public-facing website.</p>
        </div>
      </div>
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;