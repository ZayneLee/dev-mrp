"use client";

import { useState } from "react";
import axios from "axios";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

interface AddStockProps {
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

export default function AddStock({ setStocks }: AddStockProps) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [qty, setQty] = useState(0);

  const addStock = async () => {
    const newStock = {
      code,
      description,
      manufacturer,
      qty,
    };

    try {
      const response = await axios.post("/api/stocks", newStock);
      console.log("Response data:", response.data);
      setStocks((prevStocks) => [...prevStocks, response.data]);
      setCode("");
      setDescription("");
      setManufacturer("");
      setQty(0);
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Stock</h1>
      <div className="mb-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Stock Code"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="Manufacturer"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          placeholder="Quantity"
          className="border p-2 mr-2"
        />
        <button
          onClick={addStock}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
