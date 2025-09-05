import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This query fetches the single row from our 'settings' table.
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single(); // .single() ensures we only get one row

  if (error) {
    console.error("Get Settings API Error:", error);
    return res.status(500).json({ error: "Failed to fetch settings from Supabase." });
  }

  return res.status(200).json(data);
}