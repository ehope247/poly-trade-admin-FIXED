import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This query specifically finds users who have a 'referred_by' field in their metadata
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Filter to get only users who were referred
  const referredUsers = users.filter(user => user.user_metadata && user.user_metadata.referred_by);

  // We need a map to easily find the referrer's username from their ID
  const usernameMap = new Map(users.map(u => [u.user_metadata.username, u.id]));

  const formattedReferrals = referredUsers.map(user => ({
    id: user.id,
    email: user.email,
    username: user.user_metadata.username,
    referred_by: user.user_metadata.referred_by,
  }));

  return res.status(200).json({ referrals: formattedReferrals });
}