import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { depositId } = req.body;
  if (!depositId) {
    return res.status(400).json({ error: 'Deposit ID is required.' });
  }
  const { data, error } = await supabaseAdmin.rpc('approve_deposit', {
    deposit_id_to_approve: depositId,
  });
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: data });
}