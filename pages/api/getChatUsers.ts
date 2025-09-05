import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Step 1: Get all unique user IDs from the messages table.
    // This is the most reliable way to find users who have started a chat.
    const { data: messageData, error: messageError } = await supabaseAdmin
      .from('messages')
      .select('user_id');

    if (messageError) {
      throw messageError;
    }

    // Create a Set of unique IDs to remove duplicates.
    const userIdsWithMessages = [...new Set(messageData.map(msg => msg.user_id))];

    if (userIdsWithMessages.length === 0) {
      return res.status(200).json({ users: [] }); // No one has sent messages yet.
    }

    // Step 2: Get the details for ONLY the users who have sent messages.
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
      throw usersError;
    }

    // Step 3: Filter the main user list to get the profiles we need.
    const chatUsers = users
      .filter(user => userIdsWithMessages.includes(user.id))
      .map(user => ({
        user_id: user.id,
        profiles: {
          email: user.email,
          username: user.user_metadata.username || 'N/A'
        }
      }));

    return res.status(200).json({ users: chatUsers });

  } catch (error: any) {
    console.error("Definitive Get Chat Users API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch chat users.", details: error.message });
  }
}