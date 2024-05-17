"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Stock, StockLevel } from "@/pages/api/stocks";

export default function EditStock() {
  const router = useRouter();
  const params = useParams();
  const stockId = params?.id;

  const [stock, setStock] = useState<Stock>({
    id: 0,
    code: "",
    description: "",
    manufacturer: "",
    qty: 0,
    delete_flag: "",
    createdAt: new Date(),
    stockLevels: [],
  });

  const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);

  useEffect(() => {
    if (stockId) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`/api/stocks/${stockId}`);
          const fetchedStock = response.data as Stock;
          setStock(fetchedStock);
          setStockLevels(fetchedStock.stockLevels || []);
        } catch (error) {
          console.error("Error fetching stock:", error);
        }
      };
      fetchStock();
    }
  }, [stockId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStock((prevStock) => ({
      ...prevStock,
      [name]: name === "qty" ? Number(value) : value,
    }));
  };

  const handleStockLevelChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedStockLevels = [...stockLevels];
    updatedStockLevels[index] = {
      ...updatedStockLevels[index],
      [name]: name === "qty" ? Number(value) : value,
    };
    setStockLevels(updatedStockLevels);
  };

  const updateStock = async () => {
    const updatedStock = {
      code: stock.code,
      description: stock.description,
      manufacturer: stock.manufacturer,
      qty: stock.qty,
      stockLevels: stockLevels.map((level) => ({
        location: level.location,
        dateCode: level.dateCode,
        qty: level.qty,
      })),
    };

    if (!stockId) {
      return <div>Error: Missing URL parameters</div>;
    }

    try {
      await axios.put(`/api/stocks/${stockId}`, updatedStock);
      router.push("/stock/list");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const addStockLevel = () => {
    setStockLevels([
      ...stockLevels,
      {
        id: 0,
        stock_id: 0,
        location: "",
        dateCode: "",
        qty: 0,
        delete_flag: "",
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Edit Stock</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="code"
          value={stock.code}
          onChange={handleInputChange}
          placeholder="Stock Code"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={stock.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="manufacturer"
          value={stock.manufacturer}
          onChange={handleInputChange}
          placeholder="Manufacturer"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="qty"
          value={stock.qty}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Stock Levels</h2>
        {stockLevels.map((level, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              name="location"
              value={level.location}
              onChange={(e) => handleStockLevelChange(index, e)}
              placeholder="Location"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="dateCode"
              value={level.dateCode}
              onChange={(e) => handleStockLevelChange(index, e)}
              placeholder="Date Code"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="qty"
              value={level.qty}
              onChange={(e) => handleStockLevelChange(index, e)}
              placeholder="Quantity"
              className="border p-2 rounded"
            />
          </div>
        ))}
        <button
          onClick={addStockLevel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Stock Level
        </button>
      </div>

      <button
        onClick={updateStock}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
