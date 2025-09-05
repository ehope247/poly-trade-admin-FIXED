import ReferralTable from '@/components/ReferralTable';

export default function ReferralsPage() {
  return (
    <div>
      <h1>Referral Tracking</h1>
      <p>This table shows all users who signed up using a referral link.</p>
      <ReferralTable />
    </div>
  );
}