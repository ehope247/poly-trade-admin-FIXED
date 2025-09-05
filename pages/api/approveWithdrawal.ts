import { supabaseAdmin } from '@/lib/supabaseClient'; // This uses the CORRECT path alias
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { withdrawalId } = req.body;
  if (!withdrawalId) {
    return res.status(400).json({ error: 'Withdrawal ID is required' });
  }

  const { data, error } = await supabaseAdmin.rpc('approve_withdrawal', {
    withdrawal_id_to_approve: withdrawalId,
  });

  if (error) {
    console.error('Approve Withdrawal API Error:', error);
    return res.status(500).json({ error: 'Failed to approve withdrawal in database.' });
  }

  return res.status(200).json({ message: data });
}