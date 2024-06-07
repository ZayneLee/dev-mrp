import type { NextApiRequest, NextApiResponse } from "next";
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../../../lib/db";
import { Schedule } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Schedule | { message: string }>
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { description } = req.body;
    try {
      await connection.query<OkPacket>(
        "UPDATE schedules SET description = ? WHERE id = ?",
        [description, id]
      );

      const [updatedSchedule] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM schedules WHERE id = ?",
        [id]
      );

      res.status(200).json(updatedSchedule[0] as Schedule);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      await connection.query<OkPacket>("DELETE FROM schedules WHERE id = ?", [
        id,
      ]);

      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
