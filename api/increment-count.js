import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL);

    const result = await sql`
      UPDATE button_counter 
      SET count = count - 3000, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING count;
    `;

    // neon は BIGINT を string として返すため、数値化する
    const rawCount = result[0]?.count ?? 0;
    const count = Number(rawCount);

    res.status(200).json({ count });
  } catch (error) {
    console.error("Increment error:", error);
    res.status(500).json({ error: error.message, count: 0 });
  }
}
