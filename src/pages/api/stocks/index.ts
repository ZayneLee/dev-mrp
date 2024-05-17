import type { NextApiRequest, NextApiResponse } from "next";
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../../../lib/db";

export type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
  stockLevels?: StockLevel[];
};

export type StockLevel = {
  id: number;
  stock_id: number;
  location: string;
  dateCode: string;
  qty: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stock | Stock[] | { message: string }>
) {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM stock"
      );
      res.status(200).json(rows as Stock[]);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    const { code, description, manufacturer, qty, stockLevels } = req.body;

    let conn;

    try {
      conn = await connection.getConnection();
      await conn.beginTransaction();

      const [result] = await conn.query<OkPacket>(
        "INSERT INTO stock (code, description, manufacturer, qty) VALUES (?, ?, ?, ?)",
        [code, description, manufacturer, qty]
      );

      const stockId = result.insertId;

      for (const level of stockLevels) {
        await conn.query<OkPacket>(
          "INSERT INTO stock_level (stock_id, location, dateCode, qty) VALUES (?, ?, ?, ?)",
          [stockId, level.location, level.dateCode, level.qty]
        );
      }

      const [newStock] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM stock WHERE id = ?",
        [stockId]
      );

      await conn.commit();

      res.status(201).json(newStock[0] as Stock);
    } catch (error) {
      if (conn) await conn.rollback();
      res.status(500).json({ message: "Server error" });
    } finally {
      if (conn) conn.release();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
