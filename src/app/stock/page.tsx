"use client";

import AddStock from "@/components/AddStock";
import StockList from "@/components/StockList";
import Head from "next/head";
import { useState } from "react";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

const StockPage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Stock List</title>
      </Head>
      <h1 className="text-3xl font-bold underline mb-4">Stock List</h1>
      <AddStock setStocks={setStocks} />
      <StockList stocks={stocks} setStocks={setStocks} />
    </div>
  );
};

export default StockPage;
