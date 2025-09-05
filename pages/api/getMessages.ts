import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Get Messages API Error:", error);
    return res.status(500).json({ error: "Failed to fetch messages." });
  }

  return res.status(200).json(data);
}