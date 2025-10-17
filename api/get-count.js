import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const { rows } = await sql`SELECT count FROM counters WHERE name = 'inagawa_counter';`;
    // If no counter exists, return 0
    const count = rows[0]?.count || 0;
    return response.status(200).json({ count });
  } catch (error) {
    // If the table doesn't exist, we can assume a count of 0, but log the error.
    console.error(error);
    return response.status(200).json({ count: 0, error: "Failed to retrieve count, table might not exist." });
  }
}
