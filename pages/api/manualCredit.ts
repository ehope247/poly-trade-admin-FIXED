import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { email, amount } = req.body;
  const { data, error } = await supabaseAdmin.rpc('credit_user_by_email', {
    user_email: email,
    amount_to_credit: amount,
  });
  if (error) {
    return res.status(400).json({ error: 'User not found or another error occurred.' });
  }
  return res.status(200).json({ message: data });
}