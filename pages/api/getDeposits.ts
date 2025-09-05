import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Step 1: Fetch all pending deposits
  const { data: deposits, error: depositsError } = await supabaseAdmin
    .from('deposits')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (depositsError) {
    console.error("API Error - Step 1 (Fetching Deposits):", depositsError);
    return res.status(500).json({ error: "Failed to fetch deposits." });
  }

  if (!deposits || deposits.length === 0) {
    return res.status(200).json({ deposits: [] }); // Return empty if no deposits
  }

  // Step 2: Get all users from the auth schema
  const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

  if (usersError) {
    console.error("API Error - Step 2 (Fetching Users):", usersError);
    return res.status(500).json({ error: "Failed to fetch users." });
  }

  // Step 3: Combine the data in our code
  const userEmailMap = new Map(users.map(u => [u.id, u.email]));

  const combinedData = deposits.map(deposit => ({
    ...deposit,
    user_email: userEmailMap.get(deposit.user_id) || 'Unknown User'
  }));

  return res.status(200).json({ deposits: combinedData });
}