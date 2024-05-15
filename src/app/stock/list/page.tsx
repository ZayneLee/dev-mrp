"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

export default function StockList() {
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await axios.get("/api/stocks");
      setStocks(response.data);
    };
    fetchStocks();
  }, [setStocks]);

  const deleteStock = async (id: number) => {
    if (confirm("Are you sure you want to delete this stock?")) {
      await axios.delete(`/api/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock.id !== id));
    }
  };

  const editStock = (id: number) => {
    // Implement edit functionality here
    console.log(`Edit stock with id: ${id}`);
  };

  // Filter stocks by search query
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort stocks by createdAt in descending order
  const sortedStocks = [...filteredStocks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Calculate stocks to display for the current page
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Stock List</h1>
      <h1 className="text-2xl font-bold mb-4">Search Stock</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      />
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
            {currentStocks.map((stock) => (
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
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-700"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-700"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
