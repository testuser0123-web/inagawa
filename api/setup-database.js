import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // Create the counters table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS counters (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE, count INT);`;

    // Check if the 'inagawa_counter' exists
    const { rows } = await sql`SELECT * FROM counters WHERE name = 'inagawa_counter';`;

    // If it doesn't exist, insert it with a count of 0
    if (rows.length === 0) {
      await sql`INSERT INTO counters (name, count) VALUES ('inagawa_counter', 0);`;
    }

    return response.status(200).json({ message: 'Database initialized successfully.' });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
