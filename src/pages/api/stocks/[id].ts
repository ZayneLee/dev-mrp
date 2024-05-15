import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await connection.query("DELETE FROM stocks WHERE id = ?", [id]);
      res.status(200).json({ message: "Stock deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
