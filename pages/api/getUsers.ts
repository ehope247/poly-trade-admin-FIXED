import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // We format the data here to send only what we need to the front-end
  const formattedUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    username: user.user_metadata.username || 'N/A', // Handle cases where username might be missing
    created_at: user.created_at,
  }));

  return res.status(200).json({ users: formattedUsers });
}