import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  // Allow requests from all origins
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // Increment the count by 3000
    await sql`UPDATE counters SET count = count + 3000 WHERE name = 'inagawa_counter';`;

    // Get the new count
    const { rows } = await sql`SELECT count FROM counters WHERE name = 'inagawa_counter';`;
    const count = rows[0]?.count || 0;

    return response.status(200).json({ count });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
