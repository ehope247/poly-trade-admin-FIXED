import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, content } = req.body;
  if (!userId || !content) {
    return res.status(400).json({ error: 'User ID and content are required.' });
  }

  const { error } = await supabaseAdmin.from('messages').insert({
    user_id: userId,
    content: content,
    sent_by_admin: true // Mark this message as from the admin
  });

  if (error) {
    console.error("Send Message API Error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }

  return res.status(200).json({ message: 'Message sent successfully' });
}