import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // We only allow POST requests for this action
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get the planId from the request body
  const { planId } = req.body;

  // Check if planId was provided
  if (!planId) {
    return res.status(400).json({ error: 'Plan ID is required.' });
  }

  // This is the Supabase command to delete a row from the 'plans' table
  // where the 'id' column matches the planId we received.
  const { error } = await supabaseAdmin
    .from('plans')
    .delete()
    .eq('id', planId);

  if (error) {
    console.error("Delete Plan API Error:", error);
    return res.status(500).json({ error: "Failed to delete plan from Supabase." });
  }

  return res.status(200).json({ message: 'Plan deleted successfully' });
}