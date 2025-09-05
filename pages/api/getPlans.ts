import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This query fetches all plans from the 'plans' table
  // and orders them by their minimum deposit amount.
  const { data, error } = await supabaseAdmin
    .from('plans')
    .select('*')
    .order('min_deposit', { ascending: true });

  if (error) {
    console.error("Get Plans API Error:", error);
    return res.status(500).json({ error: "Failed to fetch plans from Supabase." });
  }

  return res.status(200).json({ plans: data });
}