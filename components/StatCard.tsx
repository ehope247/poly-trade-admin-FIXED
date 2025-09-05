import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default StatCard;