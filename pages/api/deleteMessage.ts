import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messageId } = req.body;
  if (!messageId) {
    return res.status(400).json({ error: 'Message ID is required.' });
  }

  const { error } = await supabaseAdmin
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) {
    console.error("Delete Message API Error:", error);
    return res.status(500).json({ error: "Failed to delete message." });
  }

  return res.status(200).json({ message: 'Message deleted successfully' });
}