import type { NextApiRequest, NextApiResponse } from "next";
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "@/lib/db";
import { Stock } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stock | { message: string }>
) {
  const { id } = req.query;

  if (req.method === "GET") {
    console.log("id", id);
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM stock WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Stock not found" });
      }

      const [stockLevels] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM stock_level WHERE stock_id = ?",
        [id]
      );

      const stock: Stock = {
        ...rows[0],
        stockLevels,
      } as Stock;

      res.status(200).json(stock);
    } catch (error) {
      console.error("Error fetching stock:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "PUT") {
    const { code, description, manufacturer, qty, stockLevels } = req.body;

    let conn;

    try {
      conn = await connection.getConnection();
      await conn.beginTransaction();

      await conn.query<OkPacket>(
        "UPDATE stock SET code = ?, description = ?, manufacturer = ?, qty = ? WHERE id = ?",
        [code, description, manufacturer, qty, id]
      );

      await conn.query<OkPacket>(
        "DELETE FROM stock_level WHERE stock_id = ?",
        [id]
      );

      for (const level of stockLevels) {
        await conn.query<OkPacket>(
          "INSERT INTO stock_level (stock_id, location, dateCode, qty) VALUES (?, ?, ?, ?)",
          [id, level.location, level.dateCode, level.qty]
        );
      }

      const [updatedStock] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM stock WHERE id = ?",
        [id]
      );

      const [updatedStockLevels] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM stock_level WHERE stock_id = ?",
        [id]
      );

      await conn.commit();

      res.status(200).json({
        ...updatedStock[0],
        stockLevels: updatedStockLevels,
      } as Stock);
    } catch (error) {
      if (conn) await conn.rollback();
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      if (conn) conn.release();
    }
  } else if (req.method === "DELETE") {
    try {
      await connection.query("DELETE FROM stocks WHERE id = ?", [id]);
      res.status(200).json({ message: "Stock deleted" });
    } catch (error) {
      console.error("Error deleting stock:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
