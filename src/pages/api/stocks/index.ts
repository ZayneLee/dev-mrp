import type { NextApiRequest, NextApiResponse } from "next";
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../../../lib/db";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stock[] | { message: string } | Stock>
) {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM stocks"
      );
      res.status(200).json(rows as Stock[]);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    const { code, description, manufacturer, qty } = req.body;
    try {
      const [result] = await connection.query<OkPacket>(
        "INSERT INTO stocks (code, description, manufacturer, qty) VALUES (?, ?, ?, ?)",
        [code, description, manufacturer, qty]
      );

      const [newStock] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM stocks WHERE id = ?",
        [result.insertId]
      );

      res.status(201).json(newStock[0] as Stock);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
