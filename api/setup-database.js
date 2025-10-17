import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL);

    // テーブルを作成
    await sql`
      CREATE TABLE IF NOT EXISTS button_counter (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 初期データがなければ挿入
    const result = await sql`SELECT COUNT(*) as count FROM button_counter`;
    if (parseInt(result[0].count) === 0) {
      await sql`INSERT INTO button_counter (count) VALUES (0)`;
    }

    res.status(200).json({ message: "Database ready" });
  } catch (error) {
    console.error("Database setup error:", error);
    res.status(500).json({ error: error.message });
  }
}
