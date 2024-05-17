"use client";

import { useState } from "react";
import axios from "axios";
import { Stock, StockLevel } from "@/pages/api/stocks";

export default function AddStock() {
  const [stock, setStock] = useState<Stock>({
    id: 0,
    code: "",
    description: "",
    manufacturer: "",
    qty: 0,
    delete_flag: "",
    createdAt: new Date(),
  });

  const [stockLevels, setStockLevels] = useState<StockLevel[]>([
    {
      id: 0,
      stock_id: 0,
      location: "",
      dateCode: "",
      qty: 0,
      delete_flag: "",
    },
  ]);

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

  const addStock = async () => {
    const newStock = {
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

    try {
      const response = await axios.post("/api/stocks", newStock);
      console.log("Response data:", response.data);
      setStock({
        id: 0,
        code: "",
        description: "",
        manufacturer: "",
        qty: 0,
        delete_flag: "",
        createdAt: new Date(),
      });
      setStockLevels([
        {
          id: 0,
          stock_id: 0,
          location: "",
          dateCode: "",
          qty: 0,
          delete_flag: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding stock:", error);
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

  const removeStockLevel = (index: number) => {
    const updatedStockLevels = stockLevels.filter((_, i) => i !== index);
    setStockLevels(updatedStockLevels);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Add Stock</h1>
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
            className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
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
            <button
              onClick={() => removeStockLevel(index)}
              className="bg-red-500 text-white px-2 py-1 rounded w-10"
            >
              x
            </button>
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
        onClick={addStock}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
