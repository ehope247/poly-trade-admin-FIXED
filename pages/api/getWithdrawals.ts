import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Step 1: Fetch all pending withdrawals
  const { data: withdrawals, error: withdrawalsError } = await supabaseAdmin
    .from('withdrawals')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (withdrawalsError) {
    console.error("API Error - Step 1 (Fetching Withdrawals):", withdrawalsError);
    return res.status(500).json({ error: "Failed to fetch withdrawals." });
  }

  if (!withdrawals || withdrawals.length === 0) {
    return res.status(200).json({ withdrawals: [] }); // Return empty if no withdrawals
  }

  // Step 2: Get all users from the auth schema
  const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

  if (usersError) {
    console.error("API Error - Step 2 (Fetching Users):", usersError);
    return res.status(500).json({ error: "Failed to fetch users." });
  }

  // Step 3: Combine the data in our code
  const userEmailMap = new Map(users.map(u => [u.id, u.email]));

  const combinedData = withdrawals.map(withdrawal => ({
    ...withdrawal,
    user_email: userEmailMap.get(withdrawal.user_id) || 'Unknown User'
  }));

  return res.status(200).json({ withdrawals: combinedData });
}