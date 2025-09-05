import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ count: data.users.length });
}