import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL);

    const result = await sql`
      UPDATE button_counter 
      SET count = count - 3000, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count
    `;

    const count = result[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Increment error:", error);
    res.status(500).json({ error: error.message });
  }
}
