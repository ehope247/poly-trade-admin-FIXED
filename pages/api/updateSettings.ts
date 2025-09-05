import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get the new settings data from the request body
  const settingsData = req.body;

  // This command updates the single row in our 'settings' table
  const { error } = await supabaseAdmin
    .from('settings')
    .update({
      address: settingsData.address,
      phone: settingsData.phone,
      email: settingsData.email,
    })
    .eq('id', 1); // We always update the row with id = 1

  if (error) {
    console.error("Update Settings API Error:", error);
    return res.status(500).json({ error: "Failed to update settings in Supabase." });
  }

  return res.status(200).json({ message: 'Settings updated successfully' });
}