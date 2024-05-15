"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

interface StockListProps {
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

export default function StockList({ stocks, setStocks }: StockListProps) {
  useEffect(() => {
    const fetchStocks = async () => {
      const response = await axios.get("/api/stocks");
      setStocks(response.data);
    };
    fetchStocks();
  }, [setStocks]);

  const deleteStock = async (id: number) => {
    await axios.delete(`/api/stocks/${id}`);
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const editStock = (id: number) => {
    // Implement edit functionality here
    console.log(`Edit stock with id: ${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock List</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 text-center">Code</th>
              <th className="py-2 px-4 border-b-2 text-center">Description</th>
              <th className="py-2 px-4 border-b-2 text-center">Manufacturer</th>
              <th className="py-2 px-4 border-b-2 text-center">Quantity</th>
              <th className="py-2 px-4 border-b-2 text-center">Created At</th>
              <th className="py-2 px-4 border-b-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="py-2 px-4 border-b text-center">{stock.code}</td>
                <td className="py-2 px-4 border-b text-center">
                  {stock.description}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {stock.manufacturer}
                </td>
                <td className="py-2 px-4 border-b text-center">{stock.qty}</td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(stock.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center flex justify-center space-x-2">
                  <button
                    onClick={() => editStock(stock.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStock(stock.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
