import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // We only allow POST requests for this action
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get the plan data from the request body
  const planData = req.body;

  // Basic validation to ensure required fields are present
  if (!planData.name || !planData.roi || !planData.duration || !planData.min_deposit || !planData.max_deposit) {
    return res.status(400).json({ error: 'All plan fields are required.' });
  }

  // This is the Supabase command to insert a new row into the 'plans' table
  const { error } = await supabaseAdmin
    .from('plans')
    .insert([
      {
        name: planData.name,
        roi: planData.roi,
        duration: planData.duration,
        min_deposit: planData.min_deposit,
        max_deposit: planData.max_deposit,
      }
    ]);

  if (error) {
    console.error("Add Plan API Error:", error);
    return res.status(500).json({ error: "Failed to add plan to Supabase." });
  }

  return res.status(200).json({ message: 'Plan added successfully' });
}