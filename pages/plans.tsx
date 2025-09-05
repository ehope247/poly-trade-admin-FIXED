import PlanManager from '@/components/PlanManager';
import styles from '@/styles/AdminDashboard.module.css'; // Reuse our standard page styles

const PlansPage = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Plan Management</h1>
          <p>Add, edit, or delete the investment plans available to users on the public site.</p>
        </div>
      </div>
      <PlanManager />
    </div>
  );
};

export default PlansPage;