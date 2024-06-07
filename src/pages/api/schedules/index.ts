import type { NextApiRequest, NextApiResponse } from "next";
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../../../lib/db";

export type Schedule = {
  id: number;
  date: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Schedule | Schedule[] | { message: string }>
) {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM schedules"
      );
      res.status(200).json(rows as Schedule[]);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    const { date, description } = req.body;

    try {
      const [result] = await connection.query<OkPacket>(
        "INSERT INTO schedules (date, description) VALUES (?, ?)",
        [date, description]
      );

      const scheduleId = result.insertId;

      const [newSchedule] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM schedules WHERE id = ?",
        [scheduleId]
      );

      res.status(201).json(newSchedule[0] as Schedule);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
