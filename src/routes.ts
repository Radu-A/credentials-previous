import { Router, Request, Response, NextFunction } from "express";
import { pool } from "./db";
import { validateUserSync } from "./middlewares/validator";

const router = Router();

router.post(
  "/sync/user",
  validateUserSync,
  async (req: Request, res: Response, next: NextFunction) => {
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
      // Delegamos el error al middleware global
      next(error);
    }
  },
);

router.get(
  "/health",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Verificamos que el pool puede comunicarse con la DB
      await pool.query("SELECT 1");

      res.status(200).json({
        status: "UP",
        database: "connected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // En un healthcheck suele ser mejor devolver el 503 directamente
      // en lugar de pasarlo al next() para no saturar los logs de errores generales
      res.status(503).json({
        status: "DOWN",
        database: "disconnected",
      });
    }
  },
);

export default router;
