import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL);

    const result = await sql`
      SELECT count FROM button_counter WHERE id = 1
    `;

    const count = result[0]?.count || 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Get count error:", error);
    res.status(500).json({ error: error.message, count: 0 });
  }
}
