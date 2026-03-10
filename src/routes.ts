import { Router, Request, Response } from "express";
import { pool } from "./db";

const router = Router();

router.post("/user", async (req: Request, res: Response) => {
  const { credential, email, name } = req.body;

  try {
    const query = `
      INSERT INTO connected_users (credential, email, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (credential, email) 
      DO UPDATE SET name = EXCLUDED.name
      RETURNING *;
    `;

    const values = [credential, email, name];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Successful synchronization",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error in DB:", error);
    res.status(500).json({ error: "Internal error in data base" });
  }
});

export default router;
