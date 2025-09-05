import { useState, useEffect } from 'react';
import styles from '@/styles/AdminForms.module.css'; // Reuse our standard form styles

const SettingsForm = () => {
  const [settings, setSettings] = useState({ address: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const response = await fetch('/api/getSettings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');
    const response = await fetch('/api/updateSettings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setMessage(response.ok ? 'Settings saved successfully!' : 'Error saving settings.');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Public Contact Information</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Company Address</label>
          <textarea id="address" name="address" rows={3} className={styles.textarea} value={settings.address} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">Company Phone</label>
          <input id="phone" name="phone" type="text" value={settings.phone} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Public Email</label>
          <input id="email" name="email" type="email" value={settings.email} onChange={handleInputChange} />
        </div>
        <button type="submit" className={styles.submitButton}>Save Settings</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
export default SettingsForm;