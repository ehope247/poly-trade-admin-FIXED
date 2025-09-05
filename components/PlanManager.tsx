import { useState, useEffect } from 'react';
import styles from './PlanManager.module.css'; // We will update this file
import formStyles from '@/styles/AdminForms.module.css'; // We will reuse our standard form styles

const PlanManager = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [newPlan, setNewPlan] = useState({ name: '', roi: '', duration: '', min_deposit: '', max_deposit: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    setLoading(true);
    const response = await fetch('/api/getPlans');
    if (response.ok) {
      const data = await response.json();
      setPlans(data.plans);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Adding plan...');
    const response = await fetch('/api/addPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newPlan,
        min_deposit: parseFloat(newPlan.min_deposit),
        max_deposit: parseFloat(newPlan.max_deposit)
      }),
    });
    if (response.ok) {
      setMessage('Plan added successfully!');
      fetchPlans();
      setNewPlan({ name: '', roi: '', duration: '', min_deposit: '', max_deposit: '' });
    } else {
      setMessage('Error adding plan.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeletePlan = async (planId: number) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    setMessage('Deleting plan...');
    const response = await fetch('/api/deletePlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId }),
    });
    if (response.ok) {
      setMessage('Plan deleted successfully!');
      fetchPlans();
    } else {
      setMessage('Error deleting plan.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.container}>
      {/* Current Plans Table */}
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Current Plans</h2>
          {message && <p className={styles.message} style={{ color: message.startsWith('Error') ? '#ff6b6b' : '#10b981' }}>{message}</p>}
        </div>
        {loading ? <p>Loading...</p> : (
          <table className={styles.table}>
            <thead><tr><th>Name</th><th>ROI</th><th>Duration</th><th>Min/Max Deposit</th><th>Action</th></tr></thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.roi}</td>
                  <td>{plan.duration}</td>
                  <td>${plan.min_deposit.toLocaleString()} / ${plan.max_deposit.toLocaleString()}</td>
                  <td><button onClick={() => handleDeletePlan(plan.id)} className={styles.deleteButton}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add New Plan Form */}
      <div className={formStyles.formContainer}>
        <h3 className={formStyles.title}>Add New Plan</h3>
        <form onSubmit={handleAddPlan} className={formStyles.form}>
          <div className={formStyles.inputGroup}>
            <label>Plan Name</label>
            <input name="name" value={newPlan.name} onChange={handleInputChange} placeholder="e.g., Gold Plan" required />
          </div>
          <div className={formStyles.inputGroup}>
            <label>ROI</label>
            <input name="roi" value={newPlan.roi} onChange={handleInputChange} placeholder="e.g., 50-70%" required />
          </div>
          <div className={formStyles.inputGroup}>
            <label>Duration</label>
            <input name="duration" value={newPlan.duration} onChange={handleInputChange} placeholder="e.g., 90 Days" required />
          </div>
          <div className={formStyles.inputGroup}>
            <label>Min Deposit (USD)</label>
            <input name="min_deposit" type="number" value={newPlan.min_deposit} onChange={handleInputChange} placeholder="e.g., 50000" required />
          </div>
          <div className={formStyles.inputGroup}>
            <label>Max Deposit (USD)</label>
            <input name="max_deposit" type="number" value={newPlan.max_deposit} onChange={handleInputChange} placeholder="e.g., 100000" required />
          </div>
          <button type="submit" className={formStyles.submitButton}>Add New Plan</button>
        </form>
      </div>
    </div>
  );
};
export default PlanManager;