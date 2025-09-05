import React from 'react';
import styles from './AdminLayout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Icons for our sidebar
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,96a8,8,0,0,1-8,8H144v64h16a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h16V104H40a8,8,0,0,1,0-16h72V40H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16h-16V88h72A8,8,0,0,1,224,96Z"></path></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.79,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>;
const IconPlans = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-48,80H112v48a8,8,0,0,1-16,0V112H48a8,8,0,0,1,0-16H96V48a8,8,0,0,1,16,0V96h48a8,8,0,0,1,0,16Z"></path></svg>;
const IconDeposit = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V88A8,8,0,0,0,208,80Zm-8,120H56V96H200ZM48,64H208a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16Z"></path></svg>;
const IconWithdraw = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,88H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm176,80H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>;
const IconReferrals = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M240,88a16,16,0,0,1-16,16H135.61l58.3,58.3a16,16,0,0,1-22.62,22.62L112,125.61V216a16,16,0,0,1-32,0V125.61L20.69,184.91a16,16,0,0,1-22.62-22.62l58.3-58.3H16A16,16,0,0,1,0,88V40A16,16,0,0,1,16,24H88a16,16,0,0,1,16,16V80h48V40a16,16,0,0,1,16-16h72a16,16,0,0,1,16,16Z"></path></svg>;
const IconChat = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.37,14.66A16,16,0,0,0,40,240a15.91,15.91,0,0,0,10.29-3.88L85.33,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Z"></path></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M164.44,148.6a8,8,0,0,1-11.31,0L128,123.31,102.87,148.6a8,8,0,0,1-11.31-11.31L116.69,112,91.56,86.71a8,8,0,0,1,11.31-11.31L128,100.69l25.13-25.13a8,8,0,0,1,11.31,11.31L139.31,112l25.13,25.29A8,8,0,0,1,164.44,148.6Zm64.23-28.4a8,8,0,0,0-8.23-7.31l-28.23-2.3-11-26.29a8,8,0,0,0-14.48,0l-11,26.29-28.23,2.3a8,8,0,0,0-5.63,14.62l21.3,19.4-6.23,28.85a8,8,0,0,0,12,8.85L128,198.85l24.7,15.4a8,8,0,0,0,12-8.85l-6.23-28.85,21.3-19.4A8,8,0,0,0,228.67,120.2Z"></path></svg>;


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Poly-Trade Admin</div>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
            <IconDashboard />
            <span>Dashboard</span>
          </Link>
          <Link href="/users" className={`${styles.navLink} ${router.pathname === '/users' ? styles.active : ''}`}>
            <IconUsers />
            <span>Users</span>
          </Link>
          <Link href="/plans" className={`${styles.navLink} ${router.pathname === '/plans' ? styles.active : ''}`}>
            <IconPlans />
            <span>Plans</span>
          </Link>
          <Link href="/deposits" className={`${styles.navLink} ${router.pathname === '/deposits' ? styles.active : ''}`}>
            <IconDeposit />
            <span>Deposits</span>
          </Link>
          <Link href="/withdrawals" className={`${styles.navLink} ${router.pathname === '/withdrawals' ? styles.active : ''}`}>
            <IconWithdraw />
            <span>Withdrawals</span>
          </Link>
          <Link href="/referrals" className={`${styles.navLink} ${router.pathname === '/referrals' ? styles.active : ''}`}>
            <IconReferrals />
            <span>Referrals</span>
          </Link>
          <Link href="/chat" className={`${styles.navLink} ${router.pathname === '/chat' ? styles.active : ''}`}>
            <IconChat />
            <span>Chat</span>
          </Link>
          <div className={styles.separator}></div>
          <Link href="/settings" className={`${styles.navLink} ${router.pathname === '/settings' ? styles.active : ''}`}>
            <IconSettings />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;