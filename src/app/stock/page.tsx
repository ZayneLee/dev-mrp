"use client";

import { useEffect, useState } from "react";
import AddStock from "@/components/AddStock";
import StockList from "@/components/StockList";
import Head from "next/head";

type Stock = {
  id: number;
  code: string;
  description: string;
  manufacturer: string;
  qty: number;
  createdAt: Date;
};

export default function Home() {
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
}
