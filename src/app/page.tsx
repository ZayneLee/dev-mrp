"use client";

import Calendar from "@/components/Calendar";
import Dashboard from "@/components/Dashboard";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Main Page</title>
      </Head>
      <h1 className="text-3xl font-bold underline mb-4">Main Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Calendar</h2>
          <Calendar />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
